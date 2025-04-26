import ThumbnailCard from "./ThumbnailCard";

const sampleImage = "https://i.postimg.cc/GmVb8kzm/image.png"; // Replace with actual image path or array

export default function ThumbnailGrid() {
  return (
    <div className="flex flex-wrap">
      {Array.from({ length: 16 }).map((_, i) => (
        <ThumbnailCard key={i} image={sampleImage} />
      ))}
    </div>
  );
}
