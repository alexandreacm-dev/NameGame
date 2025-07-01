import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { IProfile } from "../models";
import { api } from "../services/api.service";

const PracticeMode: React.FC = () => {
  const [teamMatesList, setTeamMatesList] = useState<IProfile[]>([]);
  const [currentList, setCurrentList] = useState<IProfile[]>([]);
  const [correctProfile, setCorrectProfile] = useState<IProfile | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get("profiles");
        const data = (await response.data) as IProfile[];

        setTeamMatesList(data);
        generateNewRound(data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  const generateNewRound = (dataList: IProfile[] = teamMatesList) => {
    if (dataList.length < 6) return;

    const allTeamMates = [...dataList].sort(() => 0.5 - Math.random());
    const firstSixMembers = allTeamMates.slice(0, 6);
    const randomNumber = Math.floor(Math.random() * firstSixMembers.length);
    const correct = firstSixMembers[randomNumber];

    setCurrentList(firstSixMembers);
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
          },
        },
      ]);
    }
  };

  const renderItem = ({ item }: { item: IProfile }) => {
    const isCorrect = item.id === correctProfile?.id;
    const overlayStyle = isCorrect ? "bg-green-500/60" : "bg-red-500/60";

    return (
      <Pressable onPress={() => handleGuess(item)} className="mx-2 my-2">
        <View className="relative">
          <Image
            source={{ uri: item.headshot.url }}
            className="w-[164px] h-[164px] rounded-xl"
          />
          {isCorrect && (
            <View
              className={`absolute inset-0 items-center justify-center rounded-xl ${overlayStyle}`}
            >
              <Image
                source={require("../assets/images/correct.png")}
                className="w-[60px] h-[60px]"
              />
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      {/* <Text className="text-xl font-bold mb-4">
        Score: {score} / {currentOptions.length}
      </Text> */}
      {correctProfile && (
        <View className="w-[100%] p-2">
          <Text className="text-3xl font-[SFDisplayBold] font-bold mb-4 text-center">
            {correctProfile.firstName} {correctProfile.lastName}
          </Text>
        </View>
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
