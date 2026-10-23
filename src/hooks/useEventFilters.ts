import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import type { EventFilters } from '../api/types';

export const INITIAL_FILTERS: EventFilters = {
  query: '',
  year: '',
  category: '',
  sort: 'newest',
};

export function useEventFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters: EventFilters = {
    query: searchParams.get('query') ?? '',
    year: searchParams.get('year') ?? '',
    category: searchParams.get('category') ?? '',
    sort: searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest',
  };

  const updateFilters = useCallback((patch: Partial<EventFilters>) => {
    const searchIndex = window.location.hash.indexOf('?');
    const currentParams = new URLSearchParams(
      searchIndex < 0 ? '' : window.location.hash.slice(searchIndex + 1),
    );
    const current: EventFilters = {
      query: currentParams.get('query') ?? '',
      year: currentParams.get('year') ?? '',
      category: currentParams.get('category') ?? '',
      sort: currentParams.get('sort') === 'oldest' ? 'oldest' : 'newest',
    };
    const next = { ...current, ...patch };
    const nextParams = new URLSearchParams();

    for (const key of ['query', 'year', 'category', 'sort'] as const) {
      const value = next[key];
      if (value.trim()) nextParams.set(key, value);
    }

    setSearchParams(nextParams, { replace: Object.hasOwn(patch, 'query') });
  }, [setSearchParams]);

  return { filters, updateFilters };
}
