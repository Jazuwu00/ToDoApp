import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Button({ action, title,type,size }: PropsWithChildren & { title: string , action: () => void, type: 'primary' | 'secondary' | 'danger', size: 'small' | 'medium' | 'large' }) {
  const theme = useTheme();
  return (
      <Pressable
        style={[ styles.heading, { backgroundColor: type=='primary'? theme.backgroundElement : type=='secondary'? theme.info : theme.danger , width: size=='small'? 'auto' : size=='medium'? 150 : '100%'}]}
        onPress={action}>
        <ThemedText type="small">{title}</ThemedText>
      </Pressable>

  );
}

const styles = StyleSheet.create({
 
  heading: {
  
   paddingHorizontal: Spacing.three,
    height: Spacing.five,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  pressedHeading: {
    opacity: 0.7,
  },


});
