import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../../global.css";
import useFonts from "../hooks/useFonts";
import CircularProgress from "./timed-mode/components/circular-progress";

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
        name="timed-mode/index"
        options={{
          headerTitle: "Timed Mode",
          headerRight: () => <CircularProgress />,
        }}
      />
    </Stack>
  );
}

function RootLayout() {
  const [loaded, error] = useFonts();

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
