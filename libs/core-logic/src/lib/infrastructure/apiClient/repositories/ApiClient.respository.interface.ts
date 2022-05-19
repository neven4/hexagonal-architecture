export interface ApiClientParams {
  url: string;
  body?: Record<string, unknown> | null | void;
  headers?: Record<string, string>;
  cookies?: string;
}

type CustomResponse<ResoponseBody = Record<string, never>> =
  | SuccessResponse<ResoponseBody>
  | ErrorResponse;

interface SuccessResponse<ResoponseBody> {
  ok: true;
  body: ResoponseBody;
  status: number;
  headers: Record<string, string>;
  error: undefined;
}

interface ErrorResponse {
  ok: false;
  body: Record<string, never>;
  status: number;
  headers: Record<string, string>;
  error: Error;
}

export interface ApiClientRepositoryInterface {
  get: <T>(params: ApiClientParams) => Promise<CustomResponse<T>>;
  post: <T>(params: ApiClientParams) => Promise<CustomResponse<T>>;
  put: <T>(params: ApiClientParams) => Promise<CustomResponse<T>>;
  delete: <T>(params: ApiClientParams) => Promise<CustomResponse<T>>;
  patch: <T>(params: ApiClientParams) => Promise<CustomResponse<T>>;
}
