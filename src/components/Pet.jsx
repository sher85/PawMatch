import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  // Stock image in case API results don't have images for the animal
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";

  if (images.length) {
    // Set first API image as hero image for animal
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
