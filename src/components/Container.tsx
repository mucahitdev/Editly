import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Container = ({ children, style }: ContainerProps) => {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
