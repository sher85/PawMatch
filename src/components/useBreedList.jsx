import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [breedlist, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    // does animal variable hold a value?
    if (!animal) {
      setBreedList([]);
      // else, is the value a key in the local cache?
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
      // else, request the breeds from the API passing in value of animal
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await res.json();

      // set local cache animal property and if that doesn exist then set to empty array
      localCache[animal] = json.breeds || [];

      // set breedlist to local cache animal
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedlist, status];
}
