import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import Fonts from '@/common/fonts';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function Layout() {
  const [loaded] = useFonts(Fonts);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="(video-tools)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerTitle: 'Ana Sayfa',
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
