import { z } from 'zod';
import db from "~~/server/database";
import { InsertTasksSchema, tasks } from "~~/server/database/schema";
import { eq } from "drizzle-orm";


const idParamsSchema = z.object({
    id: z.coerce.number(),
});

export default defineEventHandler(async (event) => {

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    const preresult = await getValidatedRouterParams(event, idParamsSchema.safeParse);
    


    if (!preresult.success) {
        return sendError(event, createError({
            statusCode: 422,
            statusMessage: "Invalid id",
            
        }));
    }
    await db.delete(tasks).where(eq(tasks.id, preresult.data.id))
    return { success: true };

});