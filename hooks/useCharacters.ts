import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '@/api/rickAndMorty';

const useCharacters = (query: string) => {
  return useQuery({
    queryKey: ['characters', query],
    queryFn: () => getCharacters(query),
    enabled: !!query,
  });
};

export default useCharacters;