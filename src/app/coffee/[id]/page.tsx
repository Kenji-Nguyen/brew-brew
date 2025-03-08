import { getCoffeeById } from "@/actions/coffee";
import Link from "next/link";

type CoffeeDetailProps = {
  params: {
    id: string;
  };
};

export default async function CoffeeDetail({ params }: CoffeeDetailProps) {
  const coffee = await getCoffeeById(Number(params.id));
  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 sm:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/coffee" className="text-amber-700 hover:text-amber-900 mr-4">
            &larr; Back to Coffees
          </Link>
          <h1 className="text-2xl font-bold">{coffee.name}</h1>
        </div>

        <div className="bg-white rounded-lg text-gray-900 shadow-sm border border-gray-100 p-6">
          <div className="grid gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{coffee.name}</h2>
                <p className="text-gray-600">{coffee.brandName}</p>
              </div>
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">{coffee.roastLevel}</div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="font-medium mb-2">Variety</h3>

              <p className="text-gray-700">{coffee.variety}</p>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="font-medium mb-2">Region</h3>
              <p className="text-gray-700">{coffee.region}</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Link
                href={`/coffee/${params.id}/edit`}
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
