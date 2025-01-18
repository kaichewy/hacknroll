// The shape of the response object from our API client.
interface ApiClientResponse<T> {
    type: "success" | "error",
    data: T | null,
    error: string,
}

abstract class ApiClient<T> {

}

// The shape of the response object from the backend API.
interface ApiResponse<T> {
    status: "success" | "error",
    data: T,
    error: string,
}

export type { 
    ApiClientResponse,
    ApiResponse,
}

export {
    ApiClient,
}