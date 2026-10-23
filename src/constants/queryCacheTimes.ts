export const QUERY_CACHE_TIMES = {
  STATIC_REFERENCE: {
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  },
  SHORT_REFERENCE: {
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  },
} as const;
