import { pgTable, text, serial, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  user: text("user").notNull(),
  orderId: text("order_id").notNull(),
  txnRef: text("txn_ref").notNull(),
  uniqueRef: text("unique_ref").notNull(),
  bankRef: text("bank_ref").notNull(),
  currency: text("currency").notNull().default('USD'),
  type: text("type").notNull(), // 'Payin' | 'Payout'
  gross: numeric("gross").notNull(),
  mdr: numeric("mdr").notNull(),
  net: numeric("net").notNull(),
  status: text("status").notNull(), // 'Success' | 'Pending' | 'Failed'
  date: timestamp("date").notNull().defaultNow(),
});

// === BASE SCHEMAS ===
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

// Stats type
export interface DashboardStats {
  totalBalance: string;
  todayDeposited: string;
}

// Request/Response types
export type TransactionResponse = Transaction;
export type TransactionsListResponse = Transaction[];
