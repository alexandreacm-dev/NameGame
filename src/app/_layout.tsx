import { Stack } from "expo-router";

function RootLayout() {
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

export default RootLayout;
