import { Spacing } from '@/constants/theme';
import { useTodos } from '@/context/TodoContext';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from './icon';
import { ThemedText } from './themed-text';
import { ThemedTextInput } from './themed-textInput';
import { ThemedView } from './themed-view';
import { Button } from './ui/button';
import ModalUi from './ui/Modal';
import ErrorToast from './ui/toast/ErrorToast';
import SuccessToast from './ui/toast/SuccessToast';

function HeroContent() {
    const { refresh, addTodo } = useTodos();
    const [showAddTodo, setShowAddTodo] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')


    const handleAddTodo = async () => {
        try {
            if (!title || !description) {
                return ErrorToast('Por favor, completa todos los campos!')
            }
            addTodo({ id: Date.now().toString(), title, description, completed: false, priority: false, createdAt: Date.now() });
            setTitle('');
            setDescription('');
            setShowAddTodo(false);
            SuccessToast('Creado con exito!')
        } catch (error) {
            console.log(error)
        } finally {
            await refresh();
            
        }
    }

    return (
        <View>
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
                <Button type="primary" size='large' title="Agregar tarea" action={() => setShowAddTodo(!showAddTodo)} />

            </ThemedView>
            <ModalUi isVisible={showAddTodo} title='Crea tu tarea' subtitle='Añade titulo y descripción ' onAccept={() => { handleAddTodo() }} onClose={() => { setShowAddTodo(false); setDescription(''); setTitle('') }}>

                <View style={{ gap: 20 }}>
                    <ThemedTextInput title='Título' placeholder="Título *" value={title} onChangeText={setTitle} />
                    <ThemedTextInput title='Descripción' placeholder="Descripción *" value={description} onChangeText={setDescription} />

                </View>
            </ModalUi>
        </View>
    )
}

export default HeroContent
const styles = StyleSheet.create({
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
    titleContainer: {
        gap: Spacing.three,
        alignItems: 'center',
        paddingHorizontal: Spacing.four,


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
});
