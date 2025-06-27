import { Stack } from "expo-router";

function RootLayout() {
  // const [loaded, error] = useFonts({
  //   "SF": require("../../assets/fonts/SF-Pro-Display-Regular.otf"),
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }

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
      <Stack.Screen name="timed-mode" />
    </Stack>
  );
}

export default RootLayout;
function useFonts(arg0: { "Inter-Black": any }): [any, any] {
  throw new Error("Function not implemented.");
}
