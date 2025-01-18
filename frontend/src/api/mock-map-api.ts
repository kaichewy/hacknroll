// THIS IS THE MOCK API CONTROLLER.
// LATER WE WILL ABSTRACT THIS OUT INTO BACKEND.
// FOR NOW API CALLS (TO GOOGLE MAPS) WILL BE DONE DIRECTLY FROM HERE

import { ApiResponse } from "./types";

class MockMapApi {
    async getRoute(): Promise<ApiResponse<any>> {

        return {
            status: "success",
            data: "",
            error: "",
        };
    }
}

const mockMapApi = new MockMapApi();
export default mockMapApi;