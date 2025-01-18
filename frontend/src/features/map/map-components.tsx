import { data } from "react-router-dom";
import mockMapApi from "../../api/mock-map-api";
import { ApiResponse } from "../../api/types";
import { useState } from "react";

import {
    APIProvider,
    Map,
    useMapsLibrary,
    useMap,
} from "@vis.gl/react-google-maps";

const MapView = () => {
    // // JUST TO TEST THE DATA
    // const test = async () => {
    //     const { status, data, error }: ApiResponse<any> = await mockMapApi.getRoute();
    //     console.log("TEST", data);
    // }

    // test();

    // TODO: don't hardcode; replace with the users' position.
    const position: google.maps.LatLngLiteral = {lat: 43.6532, lng: -79.3832 };

    return (

        <div style={{ height: "100vh", width: "100%" }}>
            <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <Map center={position} zoom={9}></Map>
            </APIProvider>
            "HI"
        </div>
    )
}

export {
    MapView,
}

const Directions = () => {
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
}