import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ApiEndpoint } from "./api.endpoint";

export class NetworkingBase {
    _httpClient: HttpClient = inject(HttpClient);
    _apiEndpoint: ApiEndpoint = inject(ApiEndpoint);
}