import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const AIOutput = pgTable('AIOutput', {
  id: serial('id').primaryKey(),
  formData: varchar('formData').notNull(),
  aiResponse: text('aiResponse'),
  templateSlug: varchar('templateSlug').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt')
});

export const UserSubscription = pgTable('UserSubscription', {
  id: serial('id').primaryKey(),
  email: varchar('email'),
  userName: varchar('userName'),
  active: varchar('active'),
  paymentId: varchar('paymentId'),
  joinDate: varchar('joinData')
})