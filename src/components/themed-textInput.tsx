import { StyleSheet, TextInput, View, type TextProps } from 'react-native';

import { Fonts, themePadding } from '@/constants/theme';
import { ThemedText } from './themed-text';

export type ThemedTextProps = TextProps & {
  title:string
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  lines?:number
};

export function ThemedTextInput({  placeholder, value, onChangeText,title,lines=1 }: ThemedTextProps) {

  return (
    <View>
     <ThemedText type='small'>{value&& value?.length> 0 ? title: ' ' }</ThemedText>
     
      <TextInput
        style={[
          styles.base,

        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={styles.base.color}
        multiline={lines > 1}
        numberOfLines={lines}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Fonts.sans,
    paddingLeft: themePadding.sm,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 500,
    color: '#F9F5FB',
    borderBottomColor: '#F9F5FB',
    borderBottomWidth: 0.5,
    textTransform: 'capitalize'
  },

});
