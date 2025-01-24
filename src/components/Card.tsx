import { StyleSheet, View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'section';
}

export function Card({ style, variant = 'default', children, ...props }: CardProps) {
  return (
    <View style={[styles.card, variant === 'section' && styles.section, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  section: {
    marginBottom: 16,
  },
});
