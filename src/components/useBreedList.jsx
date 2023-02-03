import { useState, useEffect } from "react";

const localCache = {};

// Custom hook to manage breed list state and fetch data from API
export default function useBreedList(animal) {
  const [breedlist, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  // Effect to fetch breed list data from API or retrieve from local cache
  useEffect(() => {
    // If animal value is not provided -> clear breed list
    if (!animal) {
      setBreedList([]);
      // If animal value is in local cache -> retrieve from cache
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
      // If animal value is not in local cache, fetch from API
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      // API Request: Breed list data for a specific animal
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await res.json();

      // Update local cache with new data and set breed list to cache value
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedlist, status];
}
