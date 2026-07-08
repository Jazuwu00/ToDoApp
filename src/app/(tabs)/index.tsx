import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CardTodo from '@/components/CardTodo';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-textInput';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Collapsible } from '@/components/ui/collapsible';
import ModalUi from '@/components/ui/Modal';
import ErrorToast from '@/components/ui/toast/ErrorToast';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTodos } from '@/hooks/useTodos';
import { useState } from 'react';



export default function HomeScreen() {
  const { todos, refresh, addTodo,updateTodo } = useTodos();
  const [showAddTodo, setShowAddTodo] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const todosCompleted = todos.filter((t) => t.completed);
  const todosOnGoing = todos.filter((t) => !t.completed);
  const importantTodos = todos.filter((t) => t.priority);

  const handleAddTodo = async () => {
    if (!title || !description) {
      return ErrorToast('Por favor, completa todos los campos!')
    }
    addTodo({ id: Date.now().toString(), title, description, completed: false, priority: false, createdAt: Date.now() });
    setTitle('');
    setDescription('');
    setShowAddTodo(false);
    await refresh();
  }

  const toggleFavorite = async (todo: Todo) => {
    await updateTodo({ ...todo, priority: !todo.priority })
  }
  const toggleCompleted = async (todo: Todo) => {
    await updateTodo({ ...todo, completed: !todo.completed })
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ gap: Spacing.five }}>

        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.heroSection}>
            <Icon />
            <ThemedText type="title" style={styles.title}>
              To do App
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={styles.centerText} >
              Crea, edita o elimina tus tareas.{'\n'} Puedes modificar su prioridad tambien!!
            </ThemedText>

          </ThemedView>
          <Button type="primary" size='large' title="Agregar tarea" action={() => setShowAddTodo(!showAddTodo)} />
          {/* crear todo*/}
          <ModalUi isVisible={showAddTodo} title='Crea tu tarea' subtitle='Añade titulo y descripción ' onAccept={() => { handleAddTodo() }} onClose={() => { setShowAddTodo(false) }}>
            <View style={{ gap: 20 }}>

              <ThemedTextInput title='Título' placeholder="Título *" value={title} onChangeText={setTitle} />
              <ThemedTextInput title='Descripción' placeholder="Descripción *" value={description} onChangeText={setDescription} />

            </View>
          </ModalUi>


          {/* todos en curso y completados */}
          <ThemedView style={styles.sectionsWrapper}>
            <Collapsible title={`Favoritos (${importantTodos.length})`}>
              {importantTodos.map((todo: Todo) => (
                <CardTodo todo={todo} key={todo.id} onToggleCompleted={toggleCompleted} onToggleFavorite={toggleFavorite} />
              ))}
            </Collapsible>
            <Collapsible title={`En curso (${todosOnGoing.length})`}>
              {todosOnGoing.map((todo: Todo) => (
                <CardTodo todo={todo} key={todo.id} onToggleCompleted={toggleCompleted} onToggleFavorite={toggleFavorite} />
              ))}
            </Collapsible>
            <Collapsible title={`Completados (${todosCompleted.length})`}>
              {todosCompleted.map((todo: Todo) => (
                <CardTodo todo={todo} key={todo.id} onToggleCompleted={toggleCompleted} onToggleFavorite={toggleFavorite} />
              ))}
            </Collapsible>


          </ThemedView>


        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
    paddingVertical: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
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

