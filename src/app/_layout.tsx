import { CustomErrorToast, CustomSuccessToast } from '@/components/CustomToast';
import { TodoProvider } from '@/context/TodoContext';
import { useTheme } from '@/hooks/use-theme';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import '../config/i18n';
import i18n from '../config/i18n';

SplashScreen.preventAutoHideAsync();
const toastConfig = {
  error: (props: any) => <CustomErrorToast {...props} />,
  success: (props: any) => <CustomSuccessToast {...props} />,
};
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {t}=useTranslation()
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
    <GestureHandlerRootView style={{ flex: 1 }}>

      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <I18nextProvider i18n={i18n}>
        <TodoProvider>
          {/* <AnimatedSplashOverlay /> */}
          <Stack screenOptions={{
            headerStyle: { backgroundColor: theme.backgroundElement },
            headerTintColor: theme.text,
            headerShadowVisible: false,
          }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="DetailTodo" options={{ title: t('detail') }} />
          </Stack>
        </TodoProvider>
        </I18nextProvider>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
