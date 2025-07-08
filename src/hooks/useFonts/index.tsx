import { useFonts as useFontsExpo } from "expo-font";

const useFonts = () => {
  const [loaded, error] = useFontsExpo({
    SFDisplayRegular: require("../../../assets/fonts/SF-Pro-Display-Regular.otf"),
    SFDisplayBold: require("../../../assets/fonts/SF-Pro-Display-Bold.otf"),
  });

  return [loaded, error];
};

export default useFonts;
