import { ReactNode } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { themePadding } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Button } from './button';

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onAccept: () => void;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  type?: 'default' | 'danger';
};

export default function ModalUi({
  isVisible,
  onClose,
  onAccept,
  title,
  subtitle,
  children,
  type = 'default',
}: ModalProps) {
  const styles = useStyles();

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
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.container}>
                {(title || subtitle) && (
                  <View style={styles.header}>
                    {title && <Text style={styles.title}>{title}</Text>}

                    {subtitle && (
                      <Text style={styles.subtitle}>{subtitle}</Text>
                    )}
                  </View>
                )}

                {children}

                <View style={styles.buttons}>
                  <Button
                    title="Cancelar"
                    size="small"
                    type={type === 'danger' ? 'secondary' : 'danger'}
                    action={onClose}
                  />

                  <Button
                    title="Aceptar"
                    size="small"
                    type={type === 'danger' ? 'danger' : 'secondary'}
                    action={onAccept}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

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

    container: {
      width: '100%',
      maxWidth: 420,
      borderRadius: 16,
      backgroundColor: theme.backgroundElement,
      padding: themePadding.xl,
      gap: themePadding.xl,
    },

    header: {
      gap: themePadding.sm,
    },

    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
    },

    subtitle: {
      fontSize: 14,
      color: theme.text,
      textAlign: 'center',
    },

    buttons: {
      flexDirection: 'row',
      justifyContent:'center',
      gap: themePadding.md,
    },
  });
}