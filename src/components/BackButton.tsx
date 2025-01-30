import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { OpaqueColorValue, TouchableOpacity } from 'react-native';

interface BackButtonProps {
  color?: string | OpaqueColorValue;
}

export function BackButton({ color = 'black' }: BackButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={28} color={color} />
    </TouchableOpacity>
  );
}
