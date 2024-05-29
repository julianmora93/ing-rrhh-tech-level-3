export interface DefaultWsResponse<T> {
    total: number;
    data: T | null;
}