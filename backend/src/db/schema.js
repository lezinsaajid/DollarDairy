const { pgTable, serial, varchar, integer, timestamp, decimal, date } = require('drizzle-orm/pg-core');

// Categories table with Clerk user ID as string
const Categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(), // Clerk user ID here
    name: varchar('name', { length: 100 }).notNull(),
    type: varchar('type', { length: 20 }).notNull(),
    color: varchar('color', { length: 7 }),
    createdAt: timestamp('created_at').defaultNow(),
});

// Transactions table with Clerk user ID as string
const Transactions = pgTable('transactions', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),  // Clerk user ID here
    categoryId: integer('category_id').references(() => Categories.id),
    title: varchar('title', { length: 255 }).notNull(),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    type: varchar('type', { length: 10 }).notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

module.exports = {
    Categories,
    Transactions,
};
