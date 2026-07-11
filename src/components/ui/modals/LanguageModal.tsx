import { Fonts, themePadding } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from 'react-i18next';
import { Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

type ModalProps = {
    isVisible: boolean;
    onClose: () => void;
};

function LanguageModal({ isVisible, onClose }: ModalProps) {
    const styles = useStyles();
    const { t, i18n } = useTranslation()
    function changeLanguage(lang: 'es' | 'en') {
        i18n.changeLanguage(lang)
        onClose()
    }
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            presentationStyle="overFullScreen"
            statusBarTranslucent
            navigationBarTranslucent
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.overlay}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.scrollContent}
                    >
                        <View style={styles.container}>
                            <Text style={styles.title}>{t('changeLanguage')}</Text>

                            <View style={styles.containerButtons}>
                                <Pressable style={styles.button} onPress={() => changeLanguage('es')} hitSlop={themePadding.md}>
                                    <Text style={styles.text}>{t('spanish')}</Text>
                                </Pressable>
                                <Pressable style={styles.button} onPress={() => changeLanguage('en')} hitSlop={themePadding.md}>
                                    <Text style={styles.text}>{t('english')}</Text>
                                </Pressable>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    )
}

export default LanguageModal


function useStyles() {
    const theme = useTheme();


    return StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: theme.modalBackground,
        },
        scrollContent: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: themePadding.lg,
        },


        title: {
            fontSize: 20,
            fontWeight: '600',
            color: theme.text,
            textAlign: 'center',
        },
        button: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: theme.background,
            height: 40,
            width: '100%',
            borderRadius: 16,
        },
        text: {
            fontSize: 14,
            fontWeight: '500',
            fontFamily: Fonts.sans,
            textAlign: 'center',

            color: theme.text,

        },
        containerButtons:{
             display: 'flex',
            flexDirection: 'column',
            width:'100%',
            gap:10
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            maxWidth: 420,
            borderRadius: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            verticalAlign: 'middle',
            alignSelf: 'center',
        
            minHeight: 200,
            padding: themePadding.lg,
            backgroundColor: theme.backgroundElement
        },

    })
}