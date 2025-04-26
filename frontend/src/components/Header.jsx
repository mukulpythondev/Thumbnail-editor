export default function Header() {
    return (
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-blue-700">THUMBNAIL GURU</h1>
          <p className="text-xs text-gray-500">"Edit Less. Create More. Go Viral."</p>
        </div>
        <div className="space-x-4">
          <span className="text-sm text-blue-600">Pricing</span>
          <button className="bg-red-600 text-white text-sm px-3 py-1 rounded-full">REGISTER NOW</button>
        </div>
      </header>
    );
  }
  