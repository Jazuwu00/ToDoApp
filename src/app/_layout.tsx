import { CustomErrorToast, CustomSuccessToast } from '@/components/CustomToast';
import { useTheme } from '@/hooks/use-theme';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';

console.log('LOG_1: modulo _layout.tsx evaluado');

SplashScreen.preventAutoHideAsync();
console.log('LOG_2: preventAutoHideAsync llamado');

const toastConfig = {
  error: (props: any) => <CustomErrorToast {...props} />,
  success: (props: any) => <CustomSuccessToast {...props} />,
};

export default function TabLayout() {
  console.log('LOG_3: TabLayout function ejecutandose');
  const colorScheme = useColorScheme();
  console.log('LOG_4: useColorScheme ok', colorScheme);
  const theme = useTheme();
  console.log('LOG_5: useTheme ok', theme);
  const [fontsLoaded, fontError] = useFonts({
    GeistPixel: require('../../assets/fonts/GeistPixel-Regular-VariableFont_ELSH.ttf'),
  });
  console.log('LOG_6: useFonts ok', fontsLoaded, fontError);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    console.log('LOG_7: primer useEffect corriendo');
    const timer = setTimeout(() => {
      console.log('LOG_8: timeout disparado');
      setTimedOut(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log('LOG_9: segundo useEffect', fontsLoaded, fontError, timedOut);
    if (fontsLoaded || fontError || timedOut) {
      console.log('LOG_10: llamando hideAsync');
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, timedOut]);

  if (!fontsLoaded && !fontError && !timedOut) {
    console.log('LOG_11: retornando null');
    return null;
  }

  console.log('LOG_12: renderizando Stack completo');
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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