import { db } from "./drizzle";
import { coffee, grinder, brew, tastingTag, brewToTastingTag } from "./schema";
import { createTastingTag, createBrewTagAssociations } from "./schema";

export async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    await db.delete(brewToTastingTag);
    await db.delete(brew);
    await db.delete(coffee);
    await db.delete(grinder);
    await db.delete(tastingTag);

    // Seed coffees
    const coffeeData = [
      {
        name: "Ethiopia Yirgacheffe",
        brandName: "Blue Bottle",
        farmName: "Aricha",
        countryOfOrigin: "Ethiopia",
        region: "Yirgacheffe",
        producer: "Various smallholders",
        variety: "Heirloom",
        processingMethod: "washed",
        roastLevel: 2, // Light-medium
      },
      {
        name: "Colombia Supremo",
        brandName: "Stumptown",
        farmName: "El Jardín",
        countryOfOrigin: "Colombia",
        region: "Huila",
        producer: "Maria Rodriguez",
        variety: "Caturra",
        processingMethod: "washed",
        roastLevel: 3, // Medium
      },
      {
        name: "Guatemala Antigua",
        brandName: "Counter Culture",
        farmName: "La Esperanza",
        countryOfOrigin: "Guatemala",
        region: "Antigua",
        producer: "Luis Valdez",
        variety: "Bourbon",
        processingMethod: "natural",
        roastLevel: 3, // Medium
      },
      {
        name: "Kenya AA",
        brandName: "Intelligentsia",
        farmName: "Nyeri Hill Estate",
        countryOfOrigin: "Kenya",
        region: "Nyeri",
        producer: "Nyeri Cooperative",
        variety: "SL28, SL34",
        processingMethod: "washed",
        roastLevel: 2, // Light-medium
      },
      {
        name: "Brazil Cerrado",
        brandName: "Verve",
        farmName: "Fazenda Santa Lucia",
        countryOfOrigin: "Brazil",
        region: "Cerrado Mineiro",
        producer: "Paulo Oliveira",
        variety: "Mundo Novo",
        processingMethod: "natural",
        roastLevel: 4, // Medium-dark
      },
    ];

    const coffeeInserts = await db.insert(coffee).values(coffeeData).returning();
    console.log(`✅ Inserted ${coffeeInserts.length} coffees`);

    // Seed grinders
    const grinderData = [
      {
        name: "Baratza Encore",
        brand: "Baratza",
        model: "Encore",
        supportsDecimalSettings: false,
      },
      {
        name: "Fellow Ode",
        brand: "Fellow",
        model: "Ode Gen 2",
        supportsDecimalSettings: false,
      },
      {
        name: "Niche Zero",
        brand: "Niche",
        model: "Zero",
        supportsDecimalSettings: true,
      },
    ];

    const grinderInserts = await db.insert(grinder).values(grinderData).returning();
    console.log(`✅ Inserted ${grinderInserts.length} grinders`);

    // Seed tasting tags
    const tastingTagData = [
      createTastingTag("Chocolate", "Flavor", true),
      createTastingTag("Fruity", "Flavor", true),
      createTastingTag("Nutty", "Flavor", true),
      createTastingTag("Floral", "Flavor", true),
      createTastingTag("Citrus", "Flavor", true),
      createTastingTag("Berry", "Flavor", true),
      createTastingTag("Caramel", "Flavor", true),
      createTastingTag("Spicy", "Flavor", true),
      createTastingTag("Earthy", "Flavor", true),
      createTastingTag("Bright", "Acidity", true),
      createTastingTag("Balanced", "Body", true),
      createTastingTag("Smooth", "Mouthfeel", true),
      createTastingTag("Complex", "Overall", true),
      createTastingTag("Clean", "Finish", true),
      createTastingTag("Juicy", "Mouthfeel", true),
    ];

    const tagInserts = await db.insert(tastingTag).values(tastingTagData).returning();
    console.log(`✅ Inserted ${tagInserts.length} tasting tags`);

    // Seed brews
    const brewMethods = ["filter", "espresso", "aeropress", "bialetti"];
    const filterTypes = ["paper", "metal", "cloth"];
    const brewerTypes = ["V60", "Chemex", "Kalita Wave", "French Press"];

    const brewData = Array.from({ length: 20 }, () => {
      const brewMethod = brewMethods[Math.floor(Math.random() * brewMethods.length)];
      const coffeeId = coffeeInserts[Math.floor(Math.random() * coffeeInserts.length)].id;
      const grinderId = grinderInserts[Math.floor(Math.random() * grinderInserts.length)].id;

      // Generate a date within the last 30 days
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));

      const baseBrew = {
        coffeeId,
        grinderId,
        brewDate: date.toISOString().split("T")[0], // Convert to YYYY-MM-DD format
        brewMethod,
        grindSetting: (Math.floor(Math.random() * 30) + 1).toString(),
        coffeeAmount: Math.floor(Math.random() * 10) + 15, // 15-25g
        waterTemperature: Math.floor(Math.random() * 10) + 88, // 88-98°C
        brewDuration: Math.floor(Math.random() * 60) + 120, // 120-180s
        acidity: Math.floor(Math.random() * 5) + 1,
        body: Math.floor(Math.random() * 5) + 1,
        sweetness: Math.floor(Math.random() * 5) + 1,
        aftertaste: Math.floor(Math.random() * 5) + 1,
        aroma: Math.floor(Math.random() * 5) + 1,
        overallRating: Math.floor(Math.random() * 5) + 1,
        isFavorite: Math.random() > 0.8, // 20% chance of being favorite
        tastingNotes: "Seeded tasting notes",
      };

      // Add method-specific parameters
      if (brewMethod === "filter") {
        return {
          ...baseBrew,
          filterType: filterTypes[Math.floor(Math.random() * filterTypes.length)],
          brewerType: brewerTypes[Math.floor(Math.random() * brewerTypes.length)],
          waterIn: Math.floor(Math.random() * 100) + 200, // 200-300ml
        };
      } else if (brewMethod === "espresso") {
        return {
          ...baseBrew,
          preInfusionTime: Math.floor(Math.random() * 5) + 3, // 3-8s
          waterOut: Math.floor(Math.random() * 10) + 30, // 30-40ml
        };
      } else if (brewMethod === "bialetti") {
        return {
          ...baseBrew,
          temperatureSetting: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
        };
      }

      return baseBrew;
    });

    const brewInserts = await db.insert(brew).values(brewData).returning();
    console.log(`✅ Inserted ${brewInserts.length} brews`);

    // Associate random tags with each brew
    for (const brewItem of brewInserts) {
      // Select 2-5 random tags for each brew
      const numTags = Math.floor(Math.random() * 4) + 2;
      const shuffledTags = [...tagInserts].sort(() => 0.5 - Math.random());
      const selectedTags = shuffledTags.slice(0, numTags);

      const tagAssociations = createBrewTagAssociations(
        brewItem.id,
        selectedTags.map((tag) => tag.id)
      );

      await db.insert(brewToTastingTag).values(tagAssociations);
    }
    console.log("✅ Associated tasting tags with brews");

    console.log("🌱 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Failed to seed database:", error);
      process.exit(1);
    });
}
