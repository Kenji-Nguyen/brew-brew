"use server";
import { db } from "@/db/drizzle";
import { brew } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getBrews() {
  const data = await db.select().from(brew);
  return data;
}

export async function getBrewById(id: number) {
  const data = await db.select().from(brew).where(eq(brew.id, id));
  return data[0];
}

export async function addBrew(newBrew: typeof brew.$inferInsert) {
  await db.insert(brew).values(newBrew);
  revalidatePath("/");
}

export async function updateBrew(id: number, data: Partial<typeof brew.$inferInsert>) {
  await db.update(brew).set(data).where(eq(brew.id, id));
  revalidatePath(`/brew/${id}`);
  revalidatePath("/brew");
}

export async function deleteBrew(id: number) {
  await db.delete(brew).where(eq(brew.id, id));
  revalidatePath("/brew");
}
