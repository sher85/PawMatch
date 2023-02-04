async function fetchBreedList({ queryKey }) {
  const animal = queryKey[1];

  if (!animal) return [];

  // API Request: Breed list data for a specific animal
  const res = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  // If response not ok -> throw an error
  if (!res.ok) {
    throw new Error(`breeds ${animal} fetch not ok`);
  }

  return res.json();
}

export default fetchBreedList;
