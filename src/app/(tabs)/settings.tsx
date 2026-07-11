import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-textInput';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import LanguageModal from '@/components/ui/modals/LanguageModal';
import ModalUi from '@/components/ui/modals/Modal';
import ErrorToast from '@/components/ui/toast/ErrorToast';
import SuccessToast from '@/components/ui/toast/SuccessToast';
import i18n from '@/config/i18n';
import {
  BottomTabInset,
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';
import { useTodos } from '@/context/TodoContext';
import { useUserOptions } from '@/hooks/useUserOptions';
import { useTranslation } from 'react-i18next';


export default function TabTwoScreen() {
  const { deleteAllTodos, refresh: refreshTodos
  } = useTodos();

  const {
    userData,
    setDataUser,
    deleteDataUser,
    refresh: refreshUser
  } = useUserOptions();
  const { t } = useTranslation()

  const [name, setName] = useState(userData?.name ?? '');
  const [lastName, setLastName] = useState(userData?.lastName ?? '');
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    action: () => Promise<void>;
  } | null>(null);

  const saveUser = async () => {
    if (!name.trim() || !lastName.trim()) {
      return ErrorToast('Por favor, completa todos los campos.');
    }

    await setDataUser({
      name: name.trim(),
      lastName: lastName.trim(),
    });

    setIsUserModalVisible(false);
  };

  useEffect(() => {
    setName(userData?.name ?? '');
    setLastName(userData?.lastName ?? '');
  }, [userData, isUserModalVisible]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          {t('welcomeUser', { name: name || t('user') })}
        </ThemedText>
        <Button
          size="large"
          title={t('changeLanguage')}
          action={() => {
            setShowLanguageModal(true)
          }}
        />
        <Button
          type="primary"
          size="large"
          title={t('modifyMyData')}
          action={() => setIsUserModalVisible(true)}
        />

        <Button
          type="danger"
          size="large"
          title={t('deleteMyData')}
          action={() => setConfirmModal({
            title: t('deleteMyDataConfirm'),
            action: async () => {
              await deleteDataUser();
              SuccessToast();
            },
          })
          }
        />

        <Button
          type="danger"
          size="large"
          title={t('deleteAllTodos')}
          action={() => {
            setConfirmModal({
              title: t('deleteTodosConfirm'),
              action: async () => {
                await deleteAllTodos();
                SuccessToast();
              },
            })
          }}
        />



        <LanguageModal isVisible={showLanguageModal} onClose={() => setShowLanguageModal(false)} />

        <ModalUi
          isVisible={isUserModalVisible}
          title={t('myData')}
          onClose={() => { setIsUserModalVisible(false); }}
          onAccept={saveUser}
        >
          <ThemedTextInput
            title={t('name')}
            value={name}
            placeholder={t('name')}
            onChangeText={setName}
          />

          <ThemedTextInput
            title={t('lastName')}
            value={lastName}
            placeholder={t('lastName')}
            onChangeText={setLastName}
          />
        </ModalUi>

        <ModalUi
          type="danger"
          isVisible={confirmModal !== null}
          title={
            confirmModal?.title
          }
          onAccept={async () => {
            await confirmModal?.action();
            setConfirmModal(null);
          }} onClose={() => setConfirmModal(null)}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

function changeLanguage(lang: 'es' | 'en') {
  i18n.changeLanguage(lang)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 52,
  },
});