async function fetchPet({ queryKey }) {
  const id = queryKey[1];

  // API Request: Specific pet details for a specific id
  const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  // If response not ok -> throw an error
  if (!res.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return res.json();
}

export default fetchPet;
