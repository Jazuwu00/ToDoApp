import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-textInput';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import ModalUi from '@/components/ui/Modal';
import ErrorToast from '@/components/ui/toast/ErrorToast';
import {
  BottomTabInset,
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';
import { useTodos } from '@/context/TodoContext';
import { useUserOptions } from '@/hooks/useUserOptions';


export default function TabTwoScreen() {
  const { deleteAllTodos, refresh: refreshTodos
  } = useTodos();

  const {
    userData,
    setDataUser,
    deleteDataUser,
    refresh: refreshUser
  } = useUserOptions();

  const [name, setName] = useState(userData?.name ?? '');
  const [lastName, setLastName] = useState(userData?.lastName ?? '');

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
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
}, [userData,isUserModalVisible]);
  
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Hola, {userData?.name ?? 'usuario'}!
        </ThemedText>

        <Button
          type="primary"
          size="large"
          title="Modificar mis datos"
          action={() => setIsUserModalVisible(true)}
        />

        <Button
          type="danger"
          size="large"
          title="Borrar mis datos"
          action={() => setConfirmModal({
            title: '¿Eliminar tus datos?',
            action: deleteDataUser ,
          })
          }
        />

        <Button
          type="danger"
          size="large"
          title="Borrar todas las tareas"
          action={() => {
            setConfirmModal({
              title: '¿Eliminar todas las tareas?',
              action: deleteAllTodos,
            })
          }}
        />
        <Button
          disabled
          size="large"
          title="Cambiar idioma"
          action={() => {
            
          }}
        />

        <ModalUi
          isVisible={isUserModalVisible}
          title="Mis datos"
          onClose={() => {setIsUserModalVisible(false);}}
          onAccept={saveUser}
        >
          <ThemedTextInput
            title="Nombre"
            value={name}
            placeholder="Mi nombre es..."
            onChangeText={setName}
          />

          <ThemedTextInput
            title="Apellido"
            value={lastName}
            placeholder="Mi apellido es..."
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