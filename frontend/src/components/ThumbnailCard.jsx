export default function ThumbnailCard({ image }) {
    return (
      <div className="w-full md:w-1/4 p-2">
        <img src={image} alt="thumbnail" className="rounded shadow-md w-full" />
      </div>
    );
  }
  