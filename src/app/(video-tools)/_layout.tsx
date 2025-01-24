import { Stack } from 'expo-router';
import { View } from 'react-native';

import { BackButton } from '@/components/BackButton';

export default function VideoToolsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="video-to-gif"
        options={{
          headerTitle: 'Video to GIF',
          headerShown: true,
          headerLeft: () => (
            <View>
              <BackButton />
            </View>
          ),
        }}
      />
    </Stack>
  );
}
