CREATE TABLE "brew" (
	"id" serial PRIMARY KEY NOT NULL,
	"coffee_id" integer,
	"grinder_id" integer,
	"brew_date" date NOT NULL,
	"brew_method" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"grind_setting" text,
	"coffee_amount" real,
	"water_temperature" integer,
	"brew_duration" integer,
	"filter_type" text,
	"brewer_type" text,
	"water_in" real,
	"pre_infusion_time" integer,
	"water_out" real,
	"temperature_setting" text,
	"acidity" integer,
	"body" integer,
	"sweetness" integer,
	"aftertaste" integer,
	"aroma" integer,
	"overall_rating" integer,
	"is_favorite" boolean DEFAULT false,
	"tasting_notes" text
);
--> statement-breakpoint
CREATE TABLE "brew_to_tasting_tag" (
	"brew_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "brew_to_tasting_tag_brew_id_tag_id_pk" PRIMARY KEY("brew_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "coffee" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"brand_name" text,
	"photo_url" text,
	"farm_name" text,
	"country_of_origin" text,
	"region" text,
	"producer" text,
	"variety" text,
	"processing_method" text NOT NULL,
	"custom_processing_method" text,
	"roast_level" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grinder" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"brand" text,
	"model" text,
	"supports_decimal_settings" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "tasting_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text,
	"is_predefined" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tasting_tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "brew" ADD CONSTRAINT "brew_coffee_id_coffee_id_fk" FOREIGN KEY ("coffee_id") REFERENCES "public"."coffee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brew" ADD CONSTRAINT "brew_grinder_id_grinder_id_fk" FOREIGN KEY ("grinder_id") REFERENCES "public"."grinder"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brew_to_tasting_tag" ADD CONSTRAINT "brew_to_tasting_tag_brew_id_brew_id_fk" FOREIGN KEY ("brew_id") REFERENCES "public"."brew"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brew_to_tasting_tag" ADD CONSTRAINT "brew_to_tasting_tag_tag_id_tasting_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tasting_tag"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "brew_date_idx" ON "brew" USING btree ("brew_date");--> statement-breakpoint
CREATE INDEX "brew_method_idx" ON "brew" USING btree ("brew_method");--> statement-breakpoint
CREATE INDEX "brew_favorite_idx" ON "brew" USING btree ("is_favorite");--> statement-breakpoint
CREATE INDEX "brew_coffee_id_idx" ON "brew" USING btree ("coffee_id");--> statement-breakpoint
CREATE INDEX "brew_grinder_id_idx" ON "brew" USING btree ("grinder_id");--> statement-breakpoint
CREATE INDEX "tasting_tag_category_idx" ON "tasting_tag" USING btree ("category");--> statement-breakpoint
CREATE INDEX "tasting_tag_predefined_idx" ON "tasting_tag" USING btree ("is_predefined");