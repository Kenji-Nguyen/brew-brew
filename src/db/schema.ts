import { integer, serial, text, pgTable, date, real, boolean, primaryKey, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Helper for common timestamp fields
const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
};

export const coffee = pgTable("coffee", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brandName: text("brand_name"),
  photoUrl: text("photo_url"),
  farmName: text("farm_name"),
  countryOfOrigin: text("country_of_origin"),
  region: text("region"),
  producer: text("producer"),
  variety: text("variety"),
  processingMethod: text("processing_method").notNull(),
  customProcessingMethod: text("custom_processing_method"),
  roastLevel: integer("roast_level").notNull(),
  ...timestamps,
});

export const coffeeRelations = relations(coffee, ({ many }) => ({
  brews: many(brew),
}));

export const grinder = pgTable("grinder", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand"),
  model: text("model"),
  supportsDecimalSettings: boolean("supports_decimal_settings").default(false),
});

export const grinderRelations = relations(grinder, ({ many }) => ({
  brews: many(brew),
}));

export const brew = pgTable(
  "brew",
  {
    id: serial("id").primaryKey(),
    coffeeId: integer("coffee_id").references(() => coffee.id),
    grinderId: integer("grinder_id").references(() => grinder.id),
    brewDate: date("brew_date").notNull(),
    brewMethod: text("brew_method").notNull(), // "filter", "espresso", "aeropress", "bialetti"
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),

    // Common parameters for all methods
    grindSetting: text("grind_setting"), // Actual grind setting used (can be "18" or "18.5" depending on grinder)
    coffeeAmount: real("coffee_amount"), // Kaffeemenge in grams
    waterTemperature: integer("water_temperature"), // Temperatur in Celsius
    brewDuration: integer("brew_duration"), // Dauer in seconds

    // Filter specific
    filterType: text("filter_type"), // Filtermethode
    brewerType: text("brewer_type"), // Brewer Type
    waterIn: real("water_in"), // Wassermenge In (ml)

    // Espresso specific
    preInfusionTime: integer("pre_infusion_time"), // Preinfusion in seconds
    waterOut: real("water_out"), // Wassermenge Out (ml)

    // Bialetti specific
    temperatureSetting: text("temperature_setting"), // Temperatur Setting

    // Tasting notes and ratings
    acidity: integer("acidity"), // Säure (1-5)
    body: integer("body"), // Körper (1-5)
    sweetness: integer("sweetness"), // Süsse (1-5)
    aftertaste: integer("aftertaste"), // Abgang (1-5)
    aroma: integer("aroma"), // Aroma (1-5)
    overallRating: integer("overall_rating"), // Overall Rating (1-5)
    isFavorite: boolean("is_favorite").default(false), // Favorite
    tastingNotes: text("tasting_notes"), // Notes (flavor descriptors) - kept for backward compatibility
  },
  (table) => [
    // Add indexes for common query patterns
    index("brew_date_idx").on(table.brewDate),
    index("brew_method_idx").on(table.brewMethod),
    index("brew_favorite_idx").on(table.isFavorite),
    index("brew_coffee_id_idx").on(table.coffeeId),
    index("brew_grinder_id_idx").on(table.grinderId),
  ]
);

export const brewRelations = relations(brew, ({ one, many }) => ({
  coffee: one(coffee, {
    fields: [brew.coffeeId],
    references: [coffee.id],
  }),
  grinder: one(grinder, {
    fields: [brew.grinderId],
    references: [grinder.id],
  }),
  tastingTags: many(brewToTastingTag),
}));

// Tasting note tags table - for predefined and user-created tags
export const tastingTag = pgTable(
  "tasting_tag",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    category: text("category"), // Optional category for organization
    isPredefined: boolean("is_predefined").default(false),
    ...timestamps,
  },
  (table) => [
    // Add index for category to speed up filtering by category
    index("tasting_tag_category_idx").on(table.category),
    index("tasting_tag_predefined_idx").on(table.isPredefined),
  ]
);

export const tastingTagRelations = relations(tastingTag, ({ many }) => ({
  brews: many(brewToTastingTag),
}));

// Junction table for many-to-many relationship between brews and tasting tags
export const brewToTastingTag = pgTable(
  "brew_to_tasting_tag",
  {
    brewId: integer("brew_id")
      .references(() => brew.id)
      .notNull(),
    tagId: integer("tag_id")
      .references(() => tastingTag.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.brewId, table.tagId] })]
);

export const brewToTastingTagRelations = relations(brewToTastingTag, ({ one }) => ({
  brew: one(brew, {
    fields: [brewToTastingTag.brewId],
    references: [brew.id],
  }),
  tag: one(tastingTag, {
    fields: [brewToTastingTag.tagId],
    references: [tastingTag.id],
  }),
}));

// Helper function to create a new tasting tag
export function createTastingTag(name: string, category?: string, isPredefined: boolean = false) {
  return {
    name,
    category,
    isPredefined,
  };
}

// Helper function to associate tags with a brew
export function createBrewTagAssociations(brewId: number, tagIds: number[]) {
  return tagIds.map((tagId) => ({
    brewId,
    tagId,
  }));
}
