import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { IProfile } from "../models";
import { api } from "../services/api.service";

const PracticeMode: React.FC = () => {
  const [teamMates, setTeamMates] = useState<IProfile[]>([]);
  const [currentOptions, setCurrentOptions] = useState<IProfile[]>([]);
  const [correctProfile, setCorrectProfile] = useState<IProfile | null>(null);
  const [score, setScore] = useState(0);

  // Fetch all profiles once
  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get("profiles");
        const data = (await response.data) as IProfile[];

        setTeamMates(data);
        generateNewRound(data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  const generateNewRound = (sourceData: IProfile[] = teamMates) => {
    if (sourceData.length < 6) return;

    const shuffled = [...sourceData].sort(() => 0.5 - Math.random());
    const options = shuffled.slice(0, 6);
    const correct = options[Math.floor(Math.random() * options.length)];

    setCurrentOptions(options);
    setCorrectProfile(correct);
  };

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
    <Pressable onPress={() => handleGuess(item)} className="mx-2 my-2">
      <Image
        source={{ uri: item.headshot.url }}
        className="w-[164px] h-[164px] rounded-xl"
      />
    </Pressable>
  );

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      <Text className="text-xl font-bold mb-4">
        Score: {score} / {currentOptions.length}
      </Text>
      {correctProfile && (
        <View className="w-[100%] p-2">
          <Text className="text-3xl font-[SFDisplayBold] font-bold mb-4 text-center">
            {correctProfile.firstName} {correctProfile.lastName}
          </Text>
        </View>
      )}
      <FlatList
        data={currentOptions}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </View>
  );
};

export default PracticeMode;
