import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import AdoptedPetContext from "./AdoptedPetContext";
import Results from "./Results";
import fetchSearch from "../fetchRequests/fetchSearch";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // State hook to store request parameters
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  // State hook to store selected animal
  const [animal, setAnimal] = useState("");

  // Custom hook to get list of breeds based on selected animal
  const [breeds] = useBreedList(animal);

  // eslint-disable-next-line no-unused-vars
  const [adoptedPet, _] = useContext(AdoptedPetContext);

  // Query for pet search results
  const results = useQuery(["search", requestParams], fetchSearch);

  // Destructure pets data from query results
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // preventing actual submit of form
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            location: formData.get("location") ?? "",
            breed: formData.get("breed") ?? "",
          };
          // Update request parameters state
          setRequestParams(obj);
        }}
      >
        {/* Adopted Pet Display */}
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        {/* Location Input */}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        {/* Animal Dropdown */}
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        {/* Breed Dropdown */}
        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={breeds.length === 0} name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>

        {/* Submit Button */}
        <button>Submit</button>
      </form>

      {/* Pet Search Results Column */}
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
