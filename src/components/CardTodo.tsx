import { Spacing, themePadding } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { router } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'
import EyeIcon from './icons/EyeIcon'
import StarIcon from './icons/StarIcon'
import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'
type Props = {
    todo: Todo;
    onToggleFavorite: () => void;
}
function CardTodo({ todo, onToggleFavorite }: Props) {
    const theme = useTheme()

    const goToDetailTodo = (todoId: string) => {
        router.push({ pathname: '/DetailTodo', params: { id: todoId } });
    }
    return (
        <ThemedView key={todo.id} type="backgroundElement" style={styles.content}>
            <View style={[styles.row, { marginBottom: Spacing.two }]}>
                <ThemedText type='default' style={styles.title} numberOfLines={1}>
                    {todo.title}
                </ThemedText>
                <View style={[styles.row, { gap: Spacing.three }]}>
                    <Pressable onPress={() => { onToggleFavorite() }} style={styles.button} ><StarIcon size={18} color={todo.priority ? theme.priority : 'white'} /></Pressable>
                    <Pressable onPress={() => { goToDetailTodo(todo.id) }} style={styles.button}><EyeIcon size={18} /></Pressable>
                </View>

            </View>
            {todo.description.length > 0 && <>
                <ThemedText type='small' numberOfLines={5}>{todo.description}</ThemedText>

            </>}

        </ThemedView>
    )
}

export default CardTodo

const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        justifyContent: 'center',
        gap: themePadding.md,
        alignItems: 'center',
        paddingHorizontal: themePadding.xs
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    }, title: {
        maxWidth: '60%',
    }, description: {

    },

    content: {
        minWidth: '80%',
        marginTop: Spacing.three,
        marginHorizontal:themePadding.md,
        borderRadius: Spacing.three,
        padding: Spacing.four,
    },
    RadioButton: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'middle'

    },
    button: {
        width: Spacing.four,
        height: Spacing.four,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
