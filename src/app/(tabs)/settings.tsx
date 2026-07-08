import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-textInput';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import ModalUi from '@/components/ui/Modal';
import ErrorToast from '@/components/ui/toast/ErrorToast';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { deleteData } from '@/hooks/todoStorage';
import { useTodos } from '@/hooks/useTodos';
import { useUserOptions } from '@/hooks/useUserOptions';
import { useState } from 'react';

export default function TabTwoScreen() {
  const { refresh } = useTodos();
  const { setDataUser, refresh: refreshUser, userData,deleteDataUser } = useUserOptions()
  const [name, setName] = useState<string | undefined>(userData?.name)
  const [lastName, setLastName] = useState<string | undefined>(userData?.lastName)

  const [modalData, setModaData] = useState(false)
  const deleteTodos = async () => {
    await deleteData()
    await refresh()
  }
  const saveDataUser = async () => {
    if (!name || !lastName) {
      return ErrorToast('Por favor, completa todos los campos!')
    }
    await setDataUser({ name: name, lastName: lastName })
    setModaData(false)
  }
  const deleteUser=async ()=>{
    await deleteDataUser()
  }
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          {`Hola, ${ userData?.name ? userData.name : 'usuario' } !`}
        </ThemedText>
        <Button type='primary' size='large' title="Modificar mis datos" action={() => setModaData(true)} />
        <Button type="danger" size='large' title="Borrar mis datos" action={() => deleteUser()} />

        <Button type="danger" size='large' title="Borrar todas las tareas" action={() => deleteTodos()} />
        <ModalUi isVisible={modalData} title='Mis datos' onClose={() => { setModaData(false) }} onAccept={() => { saveDataUser() }}>
          <ThemedTextInput title={'Nombre'} value={name} placeholder='Mi nombre es..' onChangeText={setName} />
          <ThemedTextInput title={'Apellido'} value={lastName} placeholder='Mi apellido es..' onChangeText={setLastName} />

        </ModalUi>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
    paddingVertical: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 52,

  },
});
