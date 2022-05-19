interface Request {
  url: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
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

export async function requestServer<ResponseBody>({
  url,
  method,
  ...options
}: Request): Promise<CustomResponse<ResponseBody>> {
  const headers = new window.Headers({
    ...options.headers,
    cookie: combineCookies(options.headers?.['cookie'], options.cookies),
  });
  contentSetDefault(headers, 'application/json; charset=utf-8');

  const body =
    contentIs(headers, 'application/json') && options.body
      ? JSON.stringify(options.body)
      : undefined;

  try {
    const response = await window.fetch(url, {
      method,
      headers,
      body,
    });

    const answer = contentIs(response.headers, 'application/json')
      ? await response.json()
      : await response.text();

    const parsedResponse: CustomResponse<ResponseBody> = {
      ok: response.ok,
      body: response.ok ? answer : {},
      status: response.status,
      //@ts-ignore
      headers: Object.fromEntries(response.headers.entries()),
      error: response.ok ? undefined : answer,
    };

    if (response.ok) {
      return parsedResponse;
    }

    throw parsedResponse;
  } catch (error) {
    if (error instanceof Error) {
      const errorResponse: CustomResponse = {
        ok: false,
        body: {},
        status: 900,
        headers: {},
        error,
      };

      return errorResponse;
    }

    //@ts-ignore
    return error;
  }
}

function combineCookies(...cookies: Array<string | undefined>): string {
  return cookies.filter(Boolean).join('; ');
}

/**
 * Check if content-type JSON
 */
function contentIs(headers: Headers, type: string): boolean {
  return headers.get('content-type')?.includes(type) ?? false;
}

function contentSetDefault(headers: Headers, type: string): Headers {
  if (!headers.has('content-type')) {
    headers.set('content-type', type);
  }
  return headers;
}
