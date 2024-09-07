// External Libraries
import axios, { AxiosError } from 'axios';

// Constants
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY as string;
const BASE_URL = 'https://api.unsplash.com/search/photos';
export const IMAGES_PER_PAGE = 15;

// Define types for the image and API response
interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
}

interface ApiResponse {
  results: Image[];
  total_pages: number;
  total: number;
}

// Utility function imitating slow download speed
export const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch images function
export const fetchImages = async (query: string, page: number): Promise<[Image[], number, number]> => {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.append('client_id', API_KEY);
    url.searchParams.append('query', query);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', IMAGES_PER_PAGE.toString());

    const { data } = await axios.get<ApiResponse>(url.toString());
    await delay(1000);
    return [data.results, data.total_pages, data.total];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError if needed
    } else {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
    }
    return [[], 0, 0];
  }
};
