const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  // Fetch specific pet details from pets API
  const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!res.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  // If response not ok -> throw an error
  return res.json();
};

export default fetchPet;
