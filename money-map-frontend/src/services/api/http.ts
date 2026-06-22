import type { AxiosInstance } from 'axios';

export const createHttpWrapper = (client: AxiosInstance) => {
  return {
    get: async <T>(url: string): Promise<T> => {
      const response = await client({
        method: 'GET',
        url: url
      });
      return response.data;
    },
    
    post: async <T>(url: string, body: unknown): Promise<T> => {
      const response = await client({
        method: 'POST',
        url: url,
        data: body
      });
      return response.data;
    }
  };
};