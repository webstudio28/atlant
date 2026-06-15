import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  unique,
} from "drizzle-orm/sqlite-core";

// ─── Users ────────────────────────────────────────────────────────────────────
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  role: text("role", { enum: ["admin", "client"] })
    .notNull()
    .default("client"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

// ─── Services ────────────────────────────────────────────────────────────────
export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  titleBg: text("title_bg").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionBg: text("description_bg").notNull(),
  descriptionEn: text("description_en").notNull(),
  imagePath: text("image_path").notNull(),
  imageAltBg: text("image_alt_bg").notNull().default(""),
  imageAltEn: text("image_alt_en").notNull().default(""),
  displayOrder: integer("display_order").notNull().default(0),
});

// ─── Service Items (sub-items per service card) ───────────────────────────────
export const serviceItems = sqliteTable("service_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  serviceId: integer("service_id")
    .notNull()
    .references(() => services.id, { onDelete: "cascade" }),
  labelBg: text("label_bg").notNull(),
  labelEn: text("label_en").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
});

// ─── FAQ Items ────────────────────────────────────────────────────────────────
export const faqItems = sqliteTable("faq_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionBg: text("question_bg").notNull(),
  questionEn: text("question_en").notNull(),
  answerBg: text("answer_bg").notNull(),
  answerEn: text("answer_en").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
});

// ─── Site Settings (key/value) ────────────────────────────────────────────────
export const siteSettings = sqliteTable(
  "site_settings",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    key: text("key").notNull(),
    value: text("value").notNull().default(""),
    label: text("label").notNull().default(""),
    groupName: text("group_name").notNull().default("general"),
  },
  (t) => [unique("site_settings_key_unique").on(t.key)]
);

// ─── Inquiries ────────────────────────────────────────────────────────────────
export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  serviceSlug: text("service_slug").notNull(),
  serviceTitleBg: text("service_title_bg").notNull(),
  serviceTitleEn: text("service_title_en").notNull(),
  names: text("names").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull().default(""),
  desiredDate: text("desired_date").notNull().default(""),
  message: text("message").notNull().default(""),
  status: text("status", { enum: ["new", "read", "archived"] })
    .notNull()
    .default("new"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

// ─── Types ────────────────────────────────────────────────────────────────────
export type User = typeof users.$inferSelect;
export type Service = typeof services.$inferSelect;
export type ServiceItem = typeof serviceItems.$inferSelect;
export type FaqItem = typeof faqItems.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
