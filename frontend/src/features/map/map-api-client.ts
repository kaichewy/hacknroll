import axios, { AxiosError } from "axios";
import { ApiClient, ApiClientResponse } from "../../api/types";

class MapClient extends ApiClient<any> {
  private readonly BASE_URL = "https://maps.googleapis.com/maps/api/directions/json";

  async getRoute(
    origin: string,
    destination: string,
    travelMode: string = "TRANSIT",
    apiKey: string
  ): Promise<ApiClientResponse<any>> {
    try {
      // Make an API call to the Google Maps Directions API
      const res = await axios.get(this.BASE_URL, {
        params: {
          origin,
          destination,
          mode: travelMode,
          key: apiKey,
        },
      });

      const data = res.data;

      return {
        type: "success",
        data: data,
        error: "",
      };
    } catch (err: any) {
      let message;

      if (err instanceof AxiosError) {
        message = err.response?.data.error_message ?? "Failed to get route: An unexpected error occurred.";
      } else {
        message = "Failed to get route: An unexpected error occurred.";
      }

      console.error("[MapClient.getRoute] Failed to GET route", err);

      return {
        type: "error",
        data: null,
        error: message,
      };
    }
  }
}

const mapClient = new MapClient();
export default mapClient;
