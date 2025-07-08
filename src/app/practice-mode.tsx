import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { IProfile } from "../models";
import { apiClient } from "../services/api.client";

type ItemProp = {
  item: IProfile;
};

const PracticeMode: React.FC = () => {
  const [allProfiles, setAllProfiles] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [teamMatesList, setTeamMates] = useState<IProfile[]>([]);
  const [correctProfile, setCorrectProfile] = useState<IProfile | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      try {
        const response = await apiClient.get("profiles");
        const data = response.data as IProfile[];
        setLoading(false);

        setAllProfiles(data);
        startNewRound(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    getData();
  }, []);

  const startNewRound = (profiles: IProfile[] = allProfiles) => {
    const shuffled = [...profiles].sort(() => 0.5 - Math.random()).slice(0, 6);
    const chosen = shuffled[Math.floor(Math.random() * shuffled.length)];
    setTeamMates(shuffled);
    setCorrectProfile(chosen);
    setSelectedProfile(null); // reset selection
  };

  const handleGuess = (selected: IProfile) => {
    if (selectedProfile || !correctProfile) return;

    setSelectedProfile(selected);

    if (selected.id === correctProfile.id) {
      setScore((prev) => prev + 1);

      setTimeout(() => {
        startNewRound();
      }, 2000);
    } else {
      Alert.alert("Game Over!", `Your score: ${score}`, [
        {
          text: "OK",
          onPress: () => {
            setScore(0);
            startNewRound();
          },
        },
      ]);
    }
  };

  const renderItem = ({ item }: ItemProp) => {
    const isSelected = selectedProfile?.id === item.id;
    const isCorrect = correctProfile?.id === item.id;
    const showFeedback = selectedProfile !== null;

    let overlayStyle = "";
    let Icon = null;

    if (showFeedback) {
      if (isSelected && isCorrect) {
        overlayStyle = "bg-green-500/60";
        Icon = require("../assets/images/correct.png");
      } else if (isSelected && !isCorrect) {
        overlayStyle = "bg-red-500/60";
        Icon = require("../assets/images/not_correct.png");
      }
    }

    return (
      <Pressable onPress={() => handleGuess(item)} className="mx-2 my-2">
        <View className="relative">
          <Image
            source={{ uri: item.headshot.url }}
            className="w-[164px] h-[164px] rounded-xl"
          />
          {showFeedback && (isSelected || isCorrect) && (
            <View
              className={`absolute inset-0 items-center justify-center rounded-xl ${overlayStyle}`}
            >
              <Image source={Icon} className="w-[60px] h-[60px]" />
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      {loading ? (
        <ActivityIndicator size="large" color="#808080" />
      ) : (
        <>
          {correctProfile && (
            <Text className="text-3xl font-bold mb-4 text-center">
              {correctProfile.firstName} {correctProfile.lastName}
            </Text>
          )}
          <FlatList
            data={teamMatesList}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ alignItems: "center" }}
          />
        </>
      )}
    </View>
  );
};

export default PracticeMode;
