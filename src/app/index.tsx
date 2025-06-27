import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import "../../global.css";

export default function App() {
  return (
    <View className="flex-1 p-[10px] items-center justify-center bg-[#223547]">
      <TouchableOpacity
        onPress={() => {
          router.navigate("/practice-mode");
        }}
        className="bg-[#15659D] w-[100%] p-[10px]  rounded-md mb-5"
      >
        <Text className="text-white font-semibold">Practice Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.navigate("/practice-mode");
        }}
        className="bg-[#15659D] w-[100%] p-[10px]  rounded-md"
      >
        <Text className="text-white font-semibold">Timed Mode</Text>
      </TouchableOpacity>
    </View>
  );
}
