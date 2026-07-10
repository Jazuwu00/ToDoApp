/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#F9F5FB',
    background: '#C197D2',
    danger: '#91250f',
    info: '#a053b3',
    backgroundElement: '#52325F',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    disabled: '#3c414c',
    modalBackground: 'rgba(0, 0, 0, 0.5)',
    modalContentBackground: '#eabcfd',
    priority: '#ffcc33'
  },
  dark: {
    text: '#F9F5FB',
    background: '#52325F',
    danger: '#91250f',
    info: '#694971',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
     disabled: '#3c414c',
    modalBackground: 'rgba(0, 0, 0, 0.5)',
    modalContentBackground: '#eabcfd',
      priority: '#ffcc33'
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'GeistPixel',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'GeistPixel',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'GeistPixel',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});


export const themePadding = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
