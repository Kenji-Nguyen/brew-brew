import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-[calc(100vh-4rem)] p-8 pb-20 gap-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-amber-700">Brew Brew</h1>
        <p className="text-gray-600">Track your coffee journey</p>
      </div>

      <div className="w-full max-w-md space-y-12">
        {/* Quick actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700 text-center">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/coffee/new"
              className="bg-white border-2 border-amber-700 hover:bg-amber-50 text-amber-700 font-bold py-6 px-4 rounded-lg text-center transition-colors flex flex-col items-center justify-center shadow-sm"
            >
              <span className="text-3xl mb-2">+</span>
              <span>Add Coffee</span>
            </Link>

            <Link
              href="/brews/new"
              className="bg-white border-2 border-amber-600 hover:bg-amber-50 text-amber-600 font-bold py-6 px-4 rounded-lg text-center transition-colors flex flex-col items-center justify-center shadow-sm"
            >
              <span className="text-3xl mb-2">+</span>
              <span>Add Brew</span>
            </Link>
          </div>
        </div>
      </div>

      <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Brew Brew</p>
    </div>
  );
}
