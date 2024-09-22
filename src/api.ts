const API_BASE_URL = "/api";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{ result: T; status: number }> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });


    if (!response.ok) {
      const errorText = await response.text();
      console.log(`API Error: ${response.status} - ${errorText}`);
    //   throw new Error(`API Error: ${response.status} - ${errorText}`);
    }


    return {
      result: await response.json(),
      status: response.status
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`API Request failed: ${error.message}`);
      throw error;
    } else {
      console.log("An unexpected error occurred during the API request");
    //   throw new Error("An unexpected error occurred during the API request");
    }
  }
}

export default apiRequest;
