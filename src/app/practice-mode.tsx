import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { IProfile } from "../models";
import { api } from "../services/api.service";

const PracticeMode: React.FC = () => {
  const [teamsMatesList, setTeamMatesList] = useState<IProfile[]>([]);
  const [currentList, setCurrentList] = useState<IProfile[]>([]);
  const [correctProfile, setCorrectProfile] = useState<IProfile | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function getProfiles() {
      try {
        const response = await api.get("profiles");
        const data = (await response.data) as IProfile[];

        setTeamMatesList(data);
        generateNewRound(data);
      } catch (error) {
        console.log(error);
      }
    }

    getProfiles();
  }, []);

  function generateNewRound(data: IProfile[] = teamsMatesList) {
    if (data.length < 6) return;

    const allProfiles = [...teamsMatesList];
    const nextSixProfiles = allProfiles.slice(0, 6);
    const current =
      nextSixProfiles[Math.floor(Math.random() * nextSixProfiles.length)];

    setCurrentList(nextSixProfiles);
    setCorrectProfile(current);
  }

  const handleGuess = (selected: IProfile) => {
    if (!correctProfile) return;

    if (selected.id === correctProfile.id) {
      setScore((prev) => prev + 1);
      generateNewRound();
    } else {
      Alert.alert("Game Over!", `Your score: ${score}`, [
        {
          text: "OK",
          onPress: () => {
            setScore(0);
            generateNewRound();
          },
        },
      ]);
    }
  };

  const renderItem = ({ item }: { item: IProfile }) => (
    <Pressable
      onPress={() => handleGuess(item)}
      style={{ marginLeft: 12, marginBottom: 16 }}
    >
      <Image
        source={{ uri: item.headshot.url }}
        style={{ width: 164, height: 164, borderRadius: 12 }}
      />
    </Pressable>
  );

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      {/* <Text className="text-xl font-bold mb-4">Score: {score}</Text> */}
      {correctProfile && (
        <Text className="text-lg mb-4">
          Find: {correctProfile.firstName} {correctProfile.lastName}
        </Text>
      )}
      <FlatList
        data={currentList}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </View>
  );
};

export default PracticeMode;
