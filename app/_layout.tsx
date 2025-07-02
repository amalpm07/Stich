import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-url-polyfill/auto';
import { ConsultantsProvider } from '../contexts/consultant-context';
import { MeasurementsProvider } from '../contexts/measurements-context';
import { ThemeProvider } from "../contexts/theme-context";
import { UserProvider } from "../contexts/user-context";
import { AuthProvider } from "../hooks/useAuth";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <ConsultantsProvider>
              <MeasurementsProvider>
                <BottomSheetModalProvider>
                  <Stack
                    screenOptions={{
                      headerStyle: {
                        backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
                      },
                      headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
                    }}
                    initialRouteName="(tabs)"
                  >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="auth" />
                    <Stack.Screen name="(tabs)" />
                  </Stack>
                </BottomSheetModalProvider>
              </MeasurementsProvider>
            </ConsultantsProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
