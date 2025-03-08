import Link from "next/link";
import { getCoffees } from "@/actions/coffee";

export default async function CoffeeList() {
  const coffees = await getCoffees();

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Coffees</h1>
          <Link
            href="/coffee/new"
            className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors"
          >
            Add Coffee
          </Link>
        </div>

        {coffees.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-800 mb-4">You haven&apos;t added any coffees yet.</p>
            <Link
              href="/coffee/new"
              className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors"
            >
              Add Your First Coffee
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {coffees.map((coffee) => (
              <Link
                key={coffee.id}
                href={`/coffee/${coffee.id}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-amber-500 transition-colors bg-white shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg text-gray-900">{coffee.name}</h2>
                    <p className="text-gray-600">{coffee.brandName}</p>
                  </div>
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">{coffee.roastLevel}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
