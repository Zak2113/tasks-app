import { eq } from "drizzle-orm";
import z from "zod";
import { tasks } from "~~/server/database/schema";
import db from "~~/server/database";



export default defineEventHandler(async (event) => {
    
    const task = await db.query.tasks.findMany({
        with: {},
    })
    return task;
    
});