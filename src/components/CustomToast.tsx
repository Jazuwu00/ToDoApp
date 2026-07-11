import { Fonts, themePadding } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';
import CheckIcon from './icons/CheckIcon';
import CloseIcon from './icons/CloseIcon';
import ErrorIcon from './icons/ErrorIcon';

export const CustomErrorToast = ({ text2, hide }: ToastConfigParams<any>) => {
    const styles = useStyles();
    const theme = useTheme();

    return (
        <View style={[styles.container,{backgroundColor: theme.danger}]} >
            <View style={styles.icon}>
                <ErrorIcon />
            </View>
            {text2 ? <Text style={styles.title}>{text2}</Text> : null}
            <Pressable
                onPress={() => hide?.()}
                style={styles.close}
                hitSlop={themePadding.md}>
                <CloseIcon size={14} />
            </Pressable>
        </View>
    );
};

export const CustomSuccessToast = ({ text2, hide }: ToastConfigParams<any>) => {
    const styles = useStyles();
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <CheckIcon />
            </View>
            {text2 ? <Text style={styles.title}>{text2}</Text> : null}
            <Pressable
                onPress={() => hide?.()}
                style={styles.close}
                hitSlop={themePadding.md}>
                <CloseIcon size={14} />
            </Pressable>
        </View>
    );
};

function useStyles() {
    const theme = useTheme();
    return StyleSheet.create({

        container: {
            backgroundColor: theme.modalContentBackground,
            paddingVertical: 4,
            paddingHorizontal: 10,
            marginVertical: themePadding.xs,
            width: '90%',
            borderRadius: 12,

            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 5,

            zIndex: 999999,

        },
        icon: {
            minHeight: 22,
            justifyContent: 'center',
        },
        close: {
            minHeight: 22,
            justifyContent: 'center',
        },
        title: {
            color: theme.text,
            fontFamily: Fonts.sans,
            fontSize: 14,
            lineHeight: 22,
            flexGrow: 1,
            flexShrink: 1,
        },
    })
}
