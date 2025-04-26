const categories = [
    "Trending", "Education", "Podcast", "Vlog", "Gaming", "Motivation", "Fitness", "Viral"
  ];
  
  export default function CategoryNav() {
    return (
      <nav className="bg-green-600 text-white py-3 px-6 flex flex-wrap justify-between items-center">
        <div className="flex space-x-4 overflow-auto">
          {categories.map((cat, i) => (
            <button key={i} className="uppercase font-semibold whitespace-nowrap">
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="bg-white text-black px-3 py-1 rounded ml-4"
        />
      </nav>
    );
  }
  