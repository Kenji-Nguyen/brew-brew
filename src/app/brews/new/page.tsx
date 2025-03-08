import Link from "next/link";

export default function NewBrew() {
  return (
    <div className="min-h-screen p-8 sm:p-20">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/brews" className="text-amber-700 hover:text-amber-900 mr-4">
            &larr; Back to Brews
          </Link>
          <h1 className="text-2xl font-bold">Add a Brew</h1>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="coffee" className="block font-medium">
              Coffee
            </label>
            <select
              id="coffee"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Select a coffee</option>
              <option value="1">Ethiopian Yirgacheffe</option>
              <option value="2">Colombian Supremo</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="method" className="block font-medium">
              Brew Method
            </label>
            <select
              id="method"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Select a method</option>
              <option value="pourover">Pour Over</option>
              <option value="frenchpress">French Press</option>
              <option value="aeropress">AeroPress</option>
              <option value="espresso">Espresso</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="dose" className="block font-medium">
                Dose (g)
              </label>
              <input
                type="number"
                id="dose"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="e.g., 18"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="yield" className="block font-medium">
                Yield (g)
              </label>
              <input
                type="number"
                id="yield"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="e.g., 36"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="block font-medium">
              Brew Time
            </label>
            <input
              type="text"
              id="time"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="e.g., 2:30"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="block font-medium">
              Tasting Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="e.g., Balanced acidity, sweet finish"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Save Brew
          </button>
        </form>
      </div>
    </div>
  );
}
