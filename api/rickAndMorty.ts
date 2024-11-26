// api/rickAndMorty.ts
import axios from 'axios';
import { Alert } from 'react-native';
import { Character } from '@/types/types';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (query: string): Promise<Character[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: query ? { name: query } : undefined,
    });
    return response.data.results;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      Alert.alert('No characters found for the given query');
      return [];  
    }
    Alert.alert('An error occurred while fetching characters');
    console.error('API request failed', error);
    throw error;
  }
};
