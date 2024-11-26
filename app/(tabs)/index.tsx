import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useCharacters from '../../hooks/useCharacters';
import { useSelectedCharacters } from '@/store/useSelectedCharacters';
import Icon from 'react-native-vector-icons/Ionicons';

interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

interface SelectedCharacter {
  id: number;
  name: string;
  episodes: string[];
}

const CharacterList = () => {
  const [query, setQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { data, isLoading, isError } = useCharacters(query);
  const { selectedCharacters, addCharacter, removeCharacter } = useSelectedCharacters();

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  const toggleCheckbox = (character: Character) => {
    const isAlreadySelected = selectedCharacters.some((char) => char.id === character.id);

    if (isAlreadySelected) {
      removeCharacter(character.id);
    } else {
      addCharacter({
        id: character.id,
        name: character.name,
        episodes: character.episode,
      });
    }
  };

  const renderSeparator = () => <View className="h-px bg-[#95A4B9]" />;

  if (isLoading) return <Text className="text-center text-lg">Loading...</Text>;
  if (isError) return <Text className="text-center text-lg text-red-500">Error fetching data</Text>;

  return (
    <SafeAreaView>
      <View className="p-4">
        <View className="flex-row items-center border border-[#95A4B9] rounded-lg p-2 mb-4">
          <ScrollView
            className="max-h-[calc(3*2.3rem)]"
            contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
            horizontal={false}
          >
            <View className="flex-row flex-wrap w-full">
              {selectedCharacters.map((char: SelectedCharacter) => (
                <View key={char.id} className="flex-row items-center bg-[#E2E8F0] p-2 mb-2 rounded-lg mr-2">
                  <Text className="text-[#314054] text-base">{char.name}</Text>
                  <TouchableOpacity onPress={() => removeCharacter(char.id)} className="ml-2">
                    <Icon name="close" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            
            <View className="flex-row flex-wrap items-center w-full mb-2">
              <TextInput
                className="flex-grow text-base mt-2"
                placeholder="Search for characters"
                placeholderTextColor="#A0AEC0"
                value={query}
                onChangeText={setQuery}
                onFocus={() => setIsDropdownVisible(true)}
              />
            </View>
          </ScrollView>

          <TouchableOpacity onPress={toggleDropdown} className="absolute right-4 top-4">
            <Icon
              name={isDropdownVisible 
                ? 'caret-up-outline' 
                : 'caret-down-outline'
              }
              size={20}
              color="#49576A"
            />
          </TouchableOpacity>
        </View>

        {isDropdownVisible && selectedCharacters.length === 0 && (
          <Text className="text-red-500 text-sm">Select characters to compare</Text>
        )}

        {isDropdownVisible && (
          <FlatList
            className="border border-[#95A4B9] rounded-lg max-h-[50vh]"
            data={data || []}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={renderSeparator}
            renderItem={({ item }) => {
              const isSelected = selectedCharacters.some((char) => char.id === item.id);
              const regex = new RegExp(`(${query})`, 'gi');

              return (
                <View className="flex-row p-4">
                  <TouchableOpacity onPress={() => toggleCheckbox(item)} className="flex-row items-center">
                    <View
                      className={`w-6 h-6 mr-4 border-2 rounded-lg ${
                        isSelected 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'bg-white border-gray-300'
                      }`}
                    >
                      {isSelected && <Icon name="checkmark" size={16} color="#fff" />}
                    </View>

                    <View className="flex-row">
                      <Image source={{ uri: item.image }} className="w-12 h-12 rounded-lg" />
                      <View className="ml-4">
                        <Text className="text-[#49576A] text-lg">
                          {item.name.split(regex).map((part, index) => (
                            <Text
                              key={index}
                              style={{ fontWeight: part.toLowerCase() === query.toLowerCase() 
                                ? 'bold' 
                                : 'normal' 
                              }}
                            >
                              {part}
                            </Text>
                          ))}
                        </Text>
                        <Text className="text-[#95A4B9] text-sm">{item.episode.length} Episodes</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CharacterList;
