import { AxiosError } from "axios";
import { ApiClient, ApiClientResponse, ApiResponse } from "../../api/types";
import mockMapApi from "../../api/mock-map-api";
import { Coordinate, RouteRequest } from "./map-types";
import axios from "axios";

class MapClient extends ApiClient<any> {
    // 
    async getRoute(req: RouteRequest): Promise<ApiClientResponse<Coordinate[]>> {
        try {
            // TODO: replace with axios GET call
            const res = await axios.post<ApiResponse<Coordinate[]>>(`${import.meta.env.VITE_BACKEND_API_URL}/route`, req);
            const apiResponse = res.data;
            const data = apiResponse;

            console.log("[MapClient.getRoute] Successfully GET route", res);

            return {
                type: "success",
                data: data,
                error: "",
            }
        } catch (err) {
            // TODO: replace with AxiosError or something
            let message;

            if (err instanceof AxiosError) {
                message = err.response?.data.error ?? "Failed to get route: An unexpected error occurred.";
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