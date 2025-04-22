'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { debounce } from '@/lib/utils';

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get('name');

  const [search, setSearch] = useState(name || '');

  const handleSearch = useCallback(() => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          name: search,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [search, router]);

  useEffect(() => {
    const debouncedSearch = debounce(handleSearch, 500);
    debouncedSearch();
  }, [search, handleSearch]);

  return (
    <div className="flex w-full max-w-xl items-center space-x-2">
      <div className="relative w-xl">
        <Search className="absolute top-2.5 left-3 size-4" />
        <Input
          className="pl-8"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};
