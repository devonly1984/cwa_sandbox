import type { UIMessage } from "ai"
import { index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const games = pgTable(
	"games",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		orgId: text("org_id").notNull(),
		title: text("title").notNull(),
		messages: jsonb("messages").$type<UIMessage[]>().notNull().default([]),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("games_org_id_idx").on(table.orgId)],
)