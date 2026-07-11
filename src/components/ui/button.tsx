import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Button({
  action,
  title,
  type = 'primary',
  size,
  disabled = false,
}: PropsWithChildren & {
  title: string;
  action: () => void;
  type?: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
}) {
  const theme = useTheme();

  const backgroundColors: Record<'primary' | 'secondary' | 'danger', string> = {
    primary: theme.backgroundElement,
    secondary: theme.background,
    danger: theme.danger,
  };

  const widths: Record<'small' | 'medium' | 'large', ViewStyle['width']> = {
    small: undefined,
    medium: 160,
    large: '100%',
  };
  return (
    <Pressable
      disabled={disabled}
      android_ripple={{ color: '#ffffff20' }}
      onPress={action}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled
            ? theme.disabled
            : backgroundColors[type],
          width: widths[size],
        },
        pressed && !disabled && styles.pressed,
      ]}
    >
      <ThemedText type="small">{title}</ThemedText>
    </Pressable>

  );
}

const styles = StyleSheet.create({

  button: {

    paddingHorizontal: Spacing.three,
    height: Spacing.five,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

});
