import { create } from 'zustand';

interface Character {
  id: number;
  name: string;
  episodes: string[];
}

interface SelectedCharactersStore {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
}

export const useSelectedCharacters = create<SelectedCharactersStore>((set) => ({
  selectedCharacters: [],
  addCharacter: (character: Character) =>
    set((state: SelectedCharactersStore) => ({
      selectedCharacters: [...state.selectedCharacters, character],
    })),
  removeCharacter: (id) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (char) => char.id !== id
      ),
    })),
}));
