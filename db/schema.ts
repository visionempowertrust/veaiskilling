import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const feedback = sqliteTable("feedback", {
  id: integer("id").primaryKey({ autoIncrement: true }), name: text("name").notNull(), email: text("email").notNull(), state: text("state").notNull(), school: text("school").notNull(), role: text("role").notNull(), facilitator: text("facilitator").notNull(), confidence: integer("confidence").notNull(), verify: integer("verify").notNull(), useful: integer("useful").notNull(), responsible: integer("responsible").notNull(), inclusive: integer("inclusive").notNull(), wentWell: text("went_well").notNull(), improve: text("improve").notNull(), nextTopics: text("next_topics").notNull(), recommend: text("recommend").notNull(), other: text("other").default(""), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
export const completions = sqliteTable("completions", { id: integer("id").primaryKey({autoIncrement:true}), name:text("name").notNull(), score:integer("score").notNull(), createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`) });
