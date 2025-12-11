import { eq } from "drizzle-orm";
import z from "zod";
import { tasks } from "~~/server/database/schema";
import db from "~~/server/database";


const idParamsSchema = z.object({
    id: z.coerce.number(),
});

export default defineEventHandler(async (event) => {

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    const result = await getValidatedRouterParams(event, idParamsSchema.safeParse);

    if (!result.success) {
        return sendError(event, createError({
            statusCode: 422,
            statusMessage: "Invalid id",
            
        }));
    }

    const task = await db.query.tasks.findFirst({
        where: eq(tasks.id, result.data.id),
    });

    if(!task) {
        return sendError(event, createError({
            statusCode: 404,
            statusMessage: "Task not found",
            
        }));
    }
    
    return task;
});