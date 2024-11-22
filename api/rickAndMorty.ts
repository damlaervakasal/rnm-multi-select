import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (query: string) => {
  try {
    const response = await axios.get(API_URL, {
        params: { name: query },
    });
    return response.data.results;
  } catch (error) {
    console.error('API request failed', error);
    return [];
  }
};