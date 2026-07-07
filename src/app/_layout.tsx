import { CustomErrorToast, CustomSuccessToast } from '@/components/CustomToast';
import { AnimatedSplashOverlay } from '@/components/icon';
import { useTheme } from '@/hooks/use-theme';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';


SplashScreen.preventAutoHideAsync();
const toastConfig = {
  error: (props: any) => <CustomErrorToast {...props} />,
  success: (props: any) => <CustomSuccessToast {...props} />,
};
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme()
  const [fontsLoaded, fontError] = useFonts({
    GeistPixel: require('../../assets/fonts/GeistPixel-Regular-VariableFont_ELSH.ttf'),
  });
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError || timedOut) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, timedOut]);

  if (!fontsLoaded && !fontError && !timedOut) {
    return null;
  }

  return (

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: theme.backgroundElement },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="DetailTodo" options={{ title: 'Detalle' }} />
      </Stack>
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
