import { useState } from "react";
import "../styles/gallery.css";

export default function Gallery({ images, name }) {
  const [selected, setSelected] = useState(0);
  if (!images?.length) return null;

  const current = images[selected] ?? images[0];

  return (
    <div className="gallery">
      <img className="gallery__main" src={current.original} alt={`${name}, photo ${selected + 1}`} />
      <ul className="gallery__thumbs">
        {images.map((image, index) => (
          <li key={image.thumb + index}>
            <button
              type="button"
              className={index === selected ? "thumb thumb--active" : "thumb"}
              aria-label={`Show photo ${index + 1}`}
              onClick={() => setSelected(index)}
            >
              <img src={image.thumb} alt="" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
