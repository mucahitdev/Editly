import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { theme } from '@/common/theme';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'success' | 'disabled';
  size?: 'normal' | 'large';
  title: string;
}

export function Button({
  style,
  variant = 'primary',
  size = 'normal',
  title,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        size === 'large' && styles.large,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || variant === 'disabled'}
      {...props}>
      <Text
        style={[
          styles.buttonText,
          variant === 'disabled' && styles.disabledText,
          size === 'large' && styles.largeText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  disabled: {
    backgroundColor: '#E0E0E0',
  },
  large: {
    paddingVertical: 14,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
  },
  disabledText: {
    color: '#757575',
    fontFamily: theme.fonts.medium,
  },
  largeText: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
  },
});
