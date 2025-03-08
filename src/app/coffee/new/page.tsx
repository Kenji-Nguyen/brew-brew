import Link from "next/link";

export default function NewCoffee() {
  return (
    <div className="min-h-screen p-8 sm:p-20">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/coffee" className="text-amber-700 hover:text-amber-900 mr-4">
            &larr; Back to Coffees
          </Link>
          <h1 className="text-2xl font-bold">Add a Coffee</h1>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">
              Coffee Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="e.g., Ethiopian Yirgacheffe"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="roaster" className="block font-medium">
              Roaster
            </label>
            <input
              type="text"
              id="roaster"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="e.g., Blue Bottle Coffee"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="roastLevel" className="block font-medium">
              Roast Level
            </label>
            <select
              id="roastLevel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Select a roast level</option>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="block font-medium">
              Tasting Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="e.g., Floral, citrus, chocolate"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Save Coffee
          </button>
        </form>
      </div>
    </div>
  );
}
