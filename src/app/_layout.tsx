import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../../global.css";

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
        }}
      />
      <Stack.Screen
        name="practice-mode"
        options={{
          headerTitle: "Practice Mode",
        }}
      />
      <Stack.Screen
        name="timed-mode"
        options={{
          headerTitle: "Timed Mode",
        }}
      />
    </Stack>
  );
}

function RootLayout() {
  const [loaded, error] = useFonts({
    SFDisplayRegular: require("../../assets/fonts/SF-Pro-Display-Regular.otf"),
    SFDisplayBold: require("../../assets/fonts/SF-Pro-Display-Bold.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <InitialLayout />;
}

export default RootLayout;
