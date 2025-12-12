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
    const result = await readValidatedBody(event, InsertTasksSchema.safeParse);


    if (!result.success || !preresult.success) {
        return sendError(event, createError({
            statusCode: 422,
            statusMessage: "Invalid id",
            
        }));
    }
    
    const [updated] = await db.update(tasks)
        .set(result.data)
        .where(eq(tasks.id, preresult.data.id))
        .returning();
    return {updated};

});