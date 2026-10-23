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

  function updateFilters(patch: Partial<EventFilters>) {
    setSearchParams((currentParams) => {
      const current: EventFilters = {
        query: currentParams.get('query') ?? '',
        year: currentParams.get('year') ?? '',
        category: currentParams.get('category') ?? '',
        sort: currentParams.get('sort') === 'oldest' ? 'oldest' : 'newest',
      };
      const next = { ...current, ...patch };
      return {
        query: next.query,
        year: next.year,
        category: next.category,
        sort: next.sort,
      };
    }, { replace: Object.hasOwn(patch, 'query') });
  }

  return { filters, updateFilters };
}
