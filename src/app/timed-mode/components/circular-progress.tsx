import React, { useState } from "react";
import { View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const CircularProgress: React.FC = () => {
  const [time, setTime] = useState(60);

  return (
    <View className="w-[10px] justify-center p-1 items-end">
      <AnimatedCircularProgress
        size={25}
        width={6}
        fill={100}
        tintColor="#3c3d3d"
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="#bebcbc"
      />
    </View>
  );
};

export default CircularProgress;
