import { getBrews } from "@/actions/brews";
import { getCoffeeById } from "@/actions/coffee";
import Link from "next/link";

export default async function BrewsList() {
  const brews = await getBrews();

  // Fetch coffee data for each brew
  const brewsWithCoffee = await Promise.all(
    brews.map(async (brew) => {
      const coffee = await getCoffeeById(brew.coffeeId);
      return { ...brew, coffee };
    })
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Brews</h1>
          <Link
            href="/brews/new"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors"
          >
            Add Brew
          </Link>
        </div>

        {brews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You haven&apos;t logged any brews yet.</p>
            <Link
              href="/brews/new"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors"
            >
              Log Your First Brew
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {brewsWithCoffee.map((brew) => (
              <Link
                key={brew.id}
                href={`/brews/${brew.id}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-amber-500 transition-colors bg-white shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg text-gray-900">{brew.coffee.name}</h2>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>{brew.brewMethod}</span>
                      <span>•</span>
                      <span>{brew.brewDate}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
