const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1";

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}/api/v1${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let errorDetails;
    try {
      const errorData = await response.json();
      errorDetails = errorData.details || errorData.message;
    } catch (e) {
      errorDetails = response.statusText;
    }
    throw new Error(errorDetails || "Something went wrong");
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const get = <T>(url: string, options?: RequestInit) => {
  return fetcher<T>(url, { ...options, method: "GET" });
};

export const post = <T>(url: string, data?: any, options?: RequestInit) => {
  return fetcher<T>(url, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
};

export const put = <T>(url: string, data?: any, options?: RequestInit) => {
  return fetcher<T>(url, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
};

export const patch = <T>(url: string, data?: any, options?: RequestInit) => {
  return fetcher<T>(url, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
};

export const del = <T>(url: string, options?: RequestInit) => {
  return fetcher<T>(url, { ...options, method: "DELETE" });
};
