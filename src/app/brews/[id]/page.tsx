import { getBrewById } from "@/actions/brews";
import { getCoffeeById } from "@/actions/coffee";
import Link from "next/link";

type BrewDetailProps = {
  params: {
    id: string;
  };
};

export default async function BrewDetail({ params }: BrewDetailProps) {
  const brew = await getBrewById(Number(params.id));
  const coffee = await getCoffeeById(brew.coffeeId);

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 sm:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/brews" className="text-amber-700 hover:text-amber-900 mr-4">
            &larr; Back to Brews
          </Link>
          <h1 className="text-2xl font-bold">Brew Details</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="grid gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{coffee.name}</h2>
                <p className="text-gray-600">{brew.brewMethod}</p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < brew.overallRating ? "text-amber-500" : "text-gray-300"}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500">Dose</h3>
                <p className="font-medium">{brew.coffeeAmount}g</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Yield</h3>
                <p className="font-medium">{brew.waterOut}g</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Time</h3>
                <p className="font-medium">{brew.brewDuration}s</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="font-medium mb-2">Tasting Notes</h3>
              <p className="text-gray-700">{brew.tastingNotes}</p>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="font-medium mb-2">Brewed On</h3>
              <p className="text-gray-700">{brew.brewDate}</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Link
                href={`/brews/${params.id}/edit`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg text-center transition-colors"
              >
                Edit
              </Link>
              <button className="bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-lg text-center transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
