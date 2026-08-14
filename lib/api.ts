import { FALLBACK_DATA, LibraryData } from "./types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
  "";

export async function apiGet(action = ""): Promise<any> {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_APPS_SCRIPT_URL is not configured"
    );
  }

  const url = action
    ? `${API_URL}?action=${encodeURIComponent(action)}`
    : API_URL;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function getAllData(): Promise<LibraryData> {
  try {
    const response = await apiGet("all");

    if (!response.success) {
      throw new Error(response.message || "Could not load data");
    }

    return {
      ...FALLBACK_DATA,
      ...(response.data || {}),
    };
  } catch (error) {
    console.error("getAllData error:", error);

    return {
      ...FALLBACK_DATA,
    };
  }
}

export async function postApi(
  payload: Record<string, any>
): Promise<any> {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_APPS_SCRIPT_URL is not configured"
    );
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}