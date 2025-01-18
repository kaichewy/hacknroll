import mockMapApi from "../../api/mock-map-api";
import { ApiResponse } from "../../api/types";

const MapView = () => {
    // JUST TO TEST THE DATA
    const test = async () => {
        const { status, data, error }: ApiResponse<any> = await mockMapApi.getRoute();
        console.log("TEST", data);
    }

    test();

    return (
        <>HI</>
    )
}

export {
    MapView,
}