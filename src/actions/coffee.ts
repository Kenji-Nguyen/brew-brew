"use server";
import { db } from "@/db/drizzle";
import { coffee } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCoffees() {
  const data = await db.select().from(coffee);
  return data;
}

export async function getCoffeeById(id: number) {
  const data = await db.select().from(coffee).where(eq(coffee.id, id));
  return data[0];
}

export async function addCoffee(newCoffee: typeof coffee.$inferInsert) {
  await db.insert(coffee).values(newCoffee);
  revalidatePath("/");
}

export async function updateCoffee(id: number, data: Partial<typeof coffee.$inferInsert>) {
  await db.update(coffee).set(data).where(eq(coffee.id, id));
  revalidatePath(`/coffee/${id}`);
  revalidatePath("/coffee");
}

export async function deleteCoffee(id: number) {
  await db.delete(coffee).where(eq(coffee.id, id));
  revalidatePath("/coffee");
}
