interface ApiResponse<T> {
    status: "success" | "error",
    data: T | null,
    error: string,
}

export type {
    ApiResponse,
}