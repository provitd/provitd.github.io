import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const labMembers = pgTable("lab_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  position: text("position").notNull(),
  affiliation: text("affiliation").notNull(),
  team: text("team").notNull(),
  arrivalDate: text("arrival_date").notNull(),
  departureDate: text("departure_date"),
  email: text("email"),
  bio: text("bio"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  currentPosition: text("current_position"), // For alumni
});

export const studies = pgTable("studies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  authors: jsonb("authors").notNull(), // Array of author IDs
  categories: jsonb("categories").notNull(), // Hierarchical categories
  imageUrl: text("image_url"),
  doi: text("doi"),
  geoAccessions: jsonb("geo_accessions").$type<string[]>().notNull(),
  date: text("date").notNull(),
  year: integer("year").notNull(),
  datasets: jsonb("datasets").notNull(), // Array of dataset objects
  biologicalApplication: text("biological_application").array().notNull(), // for PostgreSQL  sequencingPlatform: text("sequencing_platform").notNull(),
  sequencingPlatform: text("sequencing_platform").array().notNull(),
});

export const newsArticles = pgTable("news_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  author: text("author").notNull(),
  date: text("date").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  tags: jsonb("tags"), // Array of tags
});

// Insert schemas
export const insertLabMemberSchema = createInsertSchema(labMembers).omit({
  id: true,
});

export const insertStudySchema = createInsertSchema(studies).omit({
  id: true,
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
});

// Types
export type InsertLabMember = z.infer<typeof insertLabMemberSchema>;
export type LabMember = typeof labMembers.$inferSelect;

export type InsertStudy = z.infer<typeof insertStudySchema>;
export type Study = typeof studies.$inferSelect;

export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type NewsArticle = typeof newsArticles.$inferSelect;

// Additional types for complex data structures
export type Dataset = {
  name: string;
  description: string;
  format?: string;
  url: string;
  size?: string;
};

export type Category = {
  biologicalApplication: string;
  sequencingPlatform: {
    name: string;         // e.g. "scRNA-seq"
    sub?: string;         // e.g. "10x Genomics v3"
  }[];
};
