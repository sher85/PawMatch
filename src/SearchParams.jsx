import { useState } from "react";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // Hooks
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");

  return (
    <div className="search-params">
      <form>
        {/* LOCATION */}
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        {/* ANIMAL */}
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        {/* BUTTON */}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
