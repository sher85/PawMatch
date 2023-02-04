import { useState } from "react";

const Carousel = ({
  images = ["http://pets-images.dev-apis.com/pets/none.jpg"],
}) => {
  const [active, setActive] = useState(0);

  const handleIndexClick = (event) => {
    // Update active state when handleIndexClick is called
    setActive(+event.target.dataset.index);
  };

  return (
    <div className="carousel">
      {/* Render main image */}
      <img src={images[active]} alt="animal" />
      <div className="carousel-smaller">
        {/* Render all thumbnails */}
        {images.map((photo, index) => (
          // eslint-disable-next-line
          <img
            key={photo}
            src={photo}
            className={index === active ? "active" : ""}
            alt="animal thumbnail"
            onClick={handleIndexClick}
            data-index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
