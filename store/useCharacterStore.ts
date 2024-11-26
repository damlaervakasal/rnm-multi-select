import { create } from 'zustand';
import { Character } from '@/types/types';

interface CharacterStore {
  selectedCharacters: Character[];
  setSelectedCharacters: (characters: Character[]) => void;
  toggleCharacterSelection: (character: Character) => void;
}

const useCharacterStore = create<CharacterStore>((set) => ({
  selectedCharacters: [],
  setSelectedCharacters: (characters) => set({ selectedCharacters: characters }),
  toggleCharacterSelection: (character) => set((state) => {
    const isSelected = state.selectedCharacters.some((char) => char.id === character.id);
    return {
      selectedCharacters: isSelected
        ? state.selectedCharacters.filter((char) => char.id !== character.id)
        : [...state.selectedCharacters, character],
    };
  }),
}));

export default useCharacterStore;
