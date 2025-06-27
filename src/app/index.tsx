import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-[#182f44] p-2">
      <Image
        source={require("../assets/images/square_logo.png")}
        className="w-[450px] h-[450px]"
      />
      <View className="mb-[30px]">
        <Text className="text-lg text-white w-[270px] text-center font-normal">
          Try matching the WillowTree employee to their photo
        </Text>
      </View>
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
