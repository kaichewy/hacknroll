import { useState } from "react";
import mapClient from "../features/map/map-api-client";

export const useLongestRoute = () => {
  const [route, setRoute] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLongestRoute = async (origin: string, destination: string) => {
    setLoading(true);
    setError(null);
    try {
      const longestRoute = await mapClient.getRoute(origin, destination);
      setRoute(longestRoute);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { route, fetchLongestRoute, error, loading };
};
