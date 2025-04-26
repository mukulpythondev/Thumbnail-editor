import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import ThumbnailGrid from "./components/ThumbnailGrid";
import LoadMoreButton from "./components/LoadMoreButton";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />
      <CategoryNav />
      <div className="px-4 py-6">
        <p className="text-sm text-gray-600 mb-2">HOME &gt; TEMPLATE &gt; TRENDING</p>
        <ThumbnailGrid />
        <LoadMoreButton />
      </div>
    </div>
  );
}
