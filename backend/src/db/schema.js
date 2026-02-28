const { pgTable, serial, varchar, integer, timestamp, decimal, date, boolean } = require('drizzle-orm/pg-core');

// Categories table with Clerk user ID as string
const Categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(), // Clerk user ID here
    name: varchar('name', { length: 100 }).notNull(),
    type: varchar('type', { length: 20 }).notNull(),
    color: varchar('color', { length: 7 }),
    createdAt: timestamp('created_at').defaultNow(),
});

// User Settings table
const UserSettings = pgTable('user_settings', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull().unique(),
    currency: varchar('currency', { length: 3 }).default('USD').notNull(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Transactions table with Clerk user ID as string
const Transactions = pgTable('transactions', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),  // Clerk user ID here
    categoryId: integer('category_id').references(() => Categories.id),
    title: varchar('title', { length: 255 }).notNull(),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    currency: varchar('currency', { length: 3 }).default('USD').notNull(),
    type: varchar('type', { length: 10 }).notNull(),
    date: date('date').notNull(),
    isRecurring: boolean('is_recurring').default(false).notNull(),
    frequency: varchar('frequency', { length: 20 }), // daily, weekly, monthly, yearly
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Budgets table
const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    categoryId: integer('category_id').references(() => Categories.id),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    period: varchar('period', { length: 10 }).default('monthly').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Cards table
const Cards = pgTable('cards', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    cardNumber: varchar('card_number', { length: 20 }).notNull(),
    cardHolder: varchar('card_holder', { length: 255 }).notNull(),
    expiryMonth: varchar('expiry_month', { length: 2 }).notNull(),
    expiryYear: varchar('expiry_year', { length: 4 }).notNull(),
    type: varchar('type', { length: 20 }).default('VISA').notNull(), // VISA, MASTERCARD, etc.
    color: varchar('color', { length: 50 }).default('#667eea'),
    createdAt: timestamp('created_at').defaultNow(),
});

module.exports = {
    Categories,
    Transactions,
    Budgets,
    UserSettings,
    Cards,
};
