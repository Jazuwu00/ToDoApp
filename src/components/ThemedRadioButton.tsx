import { Pressable, StyleSheet, View, type TextProps } from 'react-native';

import { Fonts, themePadding } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import StarIcon from './icons/StarIcon';
import { ThemedText } from './themed-text';

export type ThemedRadioButtonProps = TextProps & {
    title: string
    value: boolean;
    onPress: () => void;

};

export function ThemedRadioButton({ value, onPress, title }: ThemedRadioButtonProps) {
    const theme = useTheme()
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress} hitSlop={themePadding.sm} ><StarIcon size={18} color={value? theme.priority: 'white' }/></Pressable>
            <ThemedText type='small'>{title}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        gap: 10
    },
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
    circle: {
        height: 14,
        width: 14,
        borderColor: 'transparent',
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: 'white',

    },
    completed: {

        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'green',

    }

});
