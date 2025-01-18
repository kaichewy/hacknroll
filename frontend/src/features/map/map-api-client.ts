import { AxiosError } from "axios";
import { ApiClient, ApiClientResponse } from "../../api/types";
import mockMapApi from "../../api/mock-map-api";

class MapClient extends ApiClient<any> {
  //
  async getRoute(): Promise<ApiClientResponse<any>> {
    try {
      // TODO: replace with axios GET call
      const res = await mockMapApi.getRoute();

      const data = "";

      return {
        type: "success",
        data: data,
        error: "",
      };
    } catch (err) {
      // TODO: replace with AxiosError or something
      let message;

      if (err instanceof AxiosError) {
        message =
          err.response?.data.error ??
          "Failed to get route: An unexpected error occurred.";
      } else {
        message = "Failed to get route: An unexpected error occurred.";
      }

      console.log("[MapClient.getRoute] Failed to GET route", err);

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
