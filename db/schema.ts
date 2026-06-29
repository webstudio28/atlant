import { sql } from "drizzle-orm";
import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

// ─── Users ────────────────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  role: mysqlEnum("role", ["admin", "client"]).notNull().default("client"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Services ────────────────────────────────────────────────────────────────
export const services = mysqlTable("services", {
  id: int("id").primaryKey().autoincrement(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  titleBg: text("title_bg").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionBg: text("description_bg").notNull(),
  descriptionEn: text("description_en").notNull(),
  imagePath: varchar("image_path", { length: 512 }).notNull(),
  imageAltBg: varchar("image_alt_bg", { length: 512 }).notNull().default(""),
  imageAltEn: varchar("image_alt_en", { length: 512 }).notNull().default(""),
  displayOrder: int("display_order").notNull().default(0),
});

// ─── Service Items (sub-items per service card) ───────────────────────────────
export const serviceItems = mysqlTable("service_items", {
  id: int("id").primaryKey().autoincrement(),
  serviceId: int("service_id")
    .notNull()
    .references(() => services.id, { onDelete: "cascade" }),
  labelBg: text("label_bg").notNull(),
  labelEn: text("label_en").notNull(),
  displayOrder: int("display_order").notNull().default(0),
});

// ─── FAQ Items ────────────────────────────────────────────────────────────────
export const faqItems = mysqlTable("faq_items", {
  id: int("id").primaryKey().autoincrement(),
  questionBg: text("question_bg").notNull(),
  questionEn: text("question_en").notNull(),
  answerBg: text("answer_bg").notNull(),
  answerEn: text("answer_en").notNull(),
  displayOrder: int("display_order").notNull().default(0),
});

// ─── Site Settings (key/value) ────────────────────────────────────────────────
export const siteSettings = mysqlTable(
  "site_settings",
  {
    id: int("id").primaryKey().autoincrement(),
    key: varchar("key", { length: 255 }).notNull(),
    value: text("value").notNull().default(""),
    label: varchar("label", { length: 255 }).notNull().default(""),
    groupName: varchar("group_name", { length: 255 }).notNull().default("general"),
  },
  (t) => [uniqueIndex("site_settings_key_unique").on(t.key)]
);

// ─── Inquiries ────────────────────────────────────────────────────────────────
export const inquiries = mysqlTable("inquiries", {
  id: int("id").primaryKey().autoincrement(),
  serviceSlug: varchar("service_slug", { length: 255 }).notNull(),
  serviceTitleBg: text("service_title_bg").notNull(),
  serviceTitleEn: text("service_title_en").notNull(),
  names: varchar("names", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 64 }).notNull(),
  city: varchar("city", { length: 255 }).notNull().default(""),
  desiredDate: varchar("desired_date", { length: 64 }).notNull().default(""),
  message: text("message").notNull().default(""),
  status: mysqlEnum("status", ["new", "read", "archived"]).notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Types ────────────────────────────────────────────────────────────────────
export type User = typeof users.$inferSelect;
export type Service = typeof services.$inferSelect;
export type ServiceItem = typeof serviceItems.$inferSelect;
export type FaqItem = typeof faqItems.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
