import { drizzle } from "drizzle-orm/libsql/node";

import * as schema from "./schema";

const db = drizzle({
	connection: {
		url: "file:./database.sqlite",
	},
	schema,
});

export default db;