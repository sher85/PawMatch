import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "../fetchRequests/fetchBreedList";

// Custom hook to manage breed list state and fetch data from API
export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  return [results?.data?.breeds ?? [], results.status];
}
