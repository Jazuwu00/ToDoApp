// DetailTodo.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-textInput';
import { ThemedView } from '@/components/themed-view';
import { ThemedRadioButton } from '@/components/ThemedRadioButton';
import { Button } from '@/components/ui/button';
import { ThemedPicker } from '@/components/ui/Picker';
import ErrorToast from '@/components/ui/toast/ErrorToast';
import SuccessToast from '@/components/ui/toast/SuccessToast';
import { MaxContentWidth, Spacing, themePadding } from '@/constants/theme';
import { useTodos } from '@/context/TodoContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailTodo() {
  const { id } = useLocalSearchParams<{ id: string }>();
      const { t } = useTranslation()
  
  const { updateTodo, refresh, todoById, removeTodo } = useTodos();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState<string>(todo?.title ?? '');
  const [description, setDescription] = useState<string>(todo?.description ?? '');
  const [priority, setPriority] = useState<boolean>(todo?.priority ?? false);
  const [complete, setComplete] = useState<boolean>(todo?.completed ?? false);
  useEffect(() => {
    const load = async () => {
      const result = await todoById(id);
      setTodo(result);
      if (result) {
        setTitle(result.title);
        setDescription(result.description);
        setPriority(result.priority);
        setComplete(result.completed);
      }
    };
    load();
  }, [id]);

  if (!todo) return <ThemedText>{t('taskNotFound')}</ThemedText>;
  const handleUpdateTodo = async () => {
    try {
      await updateTodo({ ...todo, title: title, description: description, priority: priority, completed: complete })
      await refresh();
    } catch (error) {
      console.log(error)
       ErrorToast(t('ErrorMessage'))
    } finally {
      SuccessToast(t('successUpdate'))
      router.push({ pathname: '/' });
    }
  }
    const handleDeleteTodo = async () => {
    try {
      await removeTodo(todo.id)
      await refresh();
    } catch (error) {
      console.log(error)
      ErrorToast(t('ErrorMessage'))
    } finally {
      SuccessToast(t('successDelete'))
      router.push({ pathname: '/' });
    }
  }

  return (
     <ThemedView style={{flex:1}}>
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>

        <View style={{ gap: themePadding.xl }}>
          <ThemedTextInput title={t('title')} placeholder={t('title')} value={title} onChangeText={setTitle} />
          <ThemedTextInput lines={4} title={t('description')} placeholder={t('description')} value={description} onChangeText={setDescription} />
          <ThemedPicker value={complete} onChange={setComplete} />
          <ThemedRadioButton title={t('markFavorite')} value={priority} onPress={() => setPriority(!priority)} />

        </View>
        <View style={{ gap: themePadding.md }}>
          <Button title={t('save')} action={() => { handleUpdateTodo() }} type={'primary'} size={'large'} />
          <Button title={t('delete')} action={() => { handleDeleteTodo() }} type={'danger'} size={'large'} />
        </View>
      </ThemedView>

    </SafeAreaView>
    </ThemedView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    gap: themePadding.xl,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    maxWidth: MaxContentWidth,

  },
  safeArea: {
    flex: 1,
    
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 52,

  },
  titleItems: {
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {

    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  }, sectionsWrapper: {
    gap: Spacing.five,
    paddingTop: Spacing.three,
    flex: 1,
  }, titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',

  },
  centerText: {
    textAlign: 'center',
  },
  content: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },
  scrollView: {
    flex: 1,

  },
  button: {
    width: Spacing.four,
    height: Spacing.four,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
