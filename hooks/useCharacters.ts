import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '@/api/rickAndMorty';
import { Character } from '@/types/types';

const useCharacters = (query: string = '') => {
  return useQuery<Character[], Error>({
    queryKey: ['characters', query],
    queryFn: () => getCharacters(query),
  });
};

export default useCharacters;
