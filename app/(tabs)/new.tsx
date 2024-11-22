import React, { useState } from 'react';
import { Text, View, TextInput, FlatList, Image } from 'react-native';
import useCharacters from '../../hooks/useCharacters';

const CharacterList = () => {
  const [query, setQuery] = useState('');
  const { data, isLoading, isError } = useCharacters(query);

  if (isLoading) return <Text className="text-center text-lg">Loading...</Text>;
  if (isError) return <Text className="text-center text-lg text-red-500">Error fetching data</Text>;

  return (
    <View className="p-4">
      <TextInput
        className="h-20 border border-gray-400 p-2 mb-4"
        placeholder="Search for characters"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-5 p-4 border rounded-lg border-gray-300">
            <Image source={{ uri: item.image }} className="w-12 h-12 rounded-full" />
            <Text className="font-bold text-white text-lg mt-2">{item.name}</Text>
            <Text>{item.episode.length} Episodes</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CharacterList;
