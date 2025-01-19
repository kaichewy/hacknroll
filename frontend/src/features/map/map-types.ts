interface Coordinate {
    lat: number,
    lng: number,
}

interface RouteRequest {
    src: Coordinate,
    dst: Coordinate,
}

export type {
    Coordinate,
    RouteRequest,
}