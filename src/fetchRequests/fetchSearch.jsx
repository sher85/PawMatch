async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];

  // API Request: Multiple pets based on animal/location/breed
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  // If response not ok -> throw an error
  if (!res.ok)
    throw new Error(`pet search not okay: ${animal}, ${location}, ${breed}`);

  return res.json();
}

export default fetchSearch;
