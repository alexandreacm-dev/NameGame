import { useFonts } from "expo-font";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import "../../global.css";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    SFProDisplayRegular: require("../../assets/fonts/SF-Pro-Display-Regular.otf"),
    SFProDisplayBold: require("../../assets/fonts/SF-Pro-Display-Bold.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center bg-[#223547] p-4">
      <Image
        source={require("../assets/images/rounded_logo.png")}
        className="w-[550px] h-[550px]"
      />
      <Text className="text-2xl text-white w-[281px] text-center mb-3">
        Try matching the WillowTree employee to their photo
      </Text>
      <TouchableOpacity
        onPress={() => router.navigate("/practice-mode")}
        className="w-[100%] p-[20px] items-center justify-center bg-[#15659D] rounded-xl mb-[10px]"
      >
        <Text className="text-white font-semibold text-xl">Practice Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.navigate("/practice-mode")}
        className="w-[100%] p-[20px] items-center justify-center bg-[#15659D] rounded-xl"
      >
        <Text className="text-white font-semibold text-xl">Timed Mode</Text>
      </TouchableOpacity>
    </View>
  );
}
