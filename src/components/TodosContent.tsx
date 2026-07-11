import { Spacing } from '@/constants/theme';
import { useTodos } from '@/context/TodoContext';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ThemedView } from './themed-view';
import { Collapsible } from './ui/collapsible';
import SwipeableRow from './ui/SwipeableRow';

function TodosContent() {
    const { todos, updateTodo, removeTodo } = useTodos();
    const {t}=useTranslation()
    const todosCompleted = todos.filter((t) => t.completed);
    const todosOnGoing = todos.filter((t) => !t.completed);
    const importantTodos = todos.filter((t) => t.priority);


    const toggleFavorite = async (todo: Todo) => {
        await updateTodo({ ...todo, priority: !todo.priority })
    }
    const toggleCompleted = async (todo: Todo) => {
        await updateTodo({ ...todo, completed: !todo.completed })
    }

    const toggleDelete = async (todo: Todo) => {
        await removeTodo(todo.id)
    }

    return (
        <ThemedView style={styles.sectionsWrapper}>
            <Collapsible title={`${t('favorite')} (${importantTodos.length})`}>
                {importantTodos.map((todo: Todo) => (
                    <SwipeableRow
                        key={todo.id}
                        todo={todo}
                        toggleFavorite={() => toggleFavorite(todo)}
                        onComplete={() => toggleCompleted(todo)}
                        onDelete={() => toggleDelete(todo)}
                    />

                ))}
            </Collapsible>
            <Collapsible title={`${t('onGoing')} (${todosOnGoing.length})`}>
                {todosOnGoing.map((todo: Todo) => (
                    <SwipeableRow
                        todo={todo}
                        key={todo.id}
                        toggleFavorite={() => toggleFavorite(todo)}
                        onComplete={() => toggleCompleted(todo)}
                        onDelete={() => toggleDelete(todo)}
                    />
                ))}
            </Collapsible>
            <Collapsible title={`${t('completed')} (${todosCompleted.length})`}>
                {todosCompleted.map((todo: Todo) => (
                    <SwipeableRow
                        todo={todo}
                        key={todo.id}
                        toggleFavorite={() => toggleFavorite(todo)}
                        onComplete={() => toggleCompleted(todo)}
                        onDelete={() => toggleDelete(todo)}

                    />
                ))}
            </Collapsible>
        </ThemedView>
    )
}

export default TodosContent
const styles = StyleSheet.create({
    sectionsWrapper: {
        gap: Spacing.five,
        paddingTop: Spacing.three,
        flex: 1,
    },
});

