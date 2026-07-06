import { themePadding } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ReactNode } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from './button';
type ModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onAccept: () => void;
    title?: string;
    children?: ReactNode
    subtitle?: string;

};
function ModalUi({ isVisible, onClose, title, subtitle, children, onAccept }: ModalProps) {
    const styles = useStyles();
    return (
        <Modal
        
            visible={isVisible}
            animationType="fade"
            navigationBarTranslucent
            statusBarTranslucent
            onRequestClose={onClose}
            transparent
        >
            <View
                style={styles.overlay}
               >
                <View
                    style={styles.container}>
                        <View style={{gap:themePadding.sm}}>{title && <Text style={styles.text}>{title}</Text>}
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}</View>
                   
                    {children}
                    <View style={styles.buttonContainer}>
                        {onClose && <Button type='danger' size='small' title="Cancelar" action={onClose} />}
                        {onAccept && <Button type='secondary' size='small' title="Aceptar" action={onAccept} />}
                    </View>
                </View>
            </View>
        </Modal>

    )
}

export default ModalUi
function useStyles() {
    const theme = useTheme();


    return StyleSheet.create({
        text: {
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '500',
            color: theme.text,

        },
        subtitle: {
            fontSize: 14,
            textAlign: 'center',
            fontWeight: '500',
            color: theme.text,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
        },
        container: {
            borderRadius: 8,
            width: '90%',
            backgroundColor: theme.backgroundElement,
            padding: themePadding.xl,
            gap: themePadding.xl
        },
        overlay: {
            backgroundColor: theme.modalBackground,
            color: theme.text,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

        }
    })
}