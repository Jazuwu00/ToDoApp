import { Spacing } from '@/constants/theme';
import { useTodos } from '@/context/TodoContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Icon } from './icon';
import { ThemedText } from './themed-text';
import { ThemedTextInput } from './themed-textInput';
import { ThemedView } from './themed-view';
import { Button } from './ui/button';
import ModalUi from './ui/modals/Modal';
import ErrorToast from './ui/toast/ErrorToast';
import SuccessToast from './ui/toast/SuccessToast';

function HeroContent() {
    const { refresh, addTodo } = useTodos();
    const [showAddTodo, setShowAddTodo] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const { t } = useTranslation()

    const handleAddTodo = async () => {
        try {
            if (!title || !description) {
                return ErrorToast(t('fillFields'))
            }
            addTodo({ id: Date.now().toString(), title, description, completed: false, priority: false, createdAt: Date.now() });
            setTitle('');
            setDescription('');
            setShowAddTodo(false);
            SuccessToast(t('successfullyCreated'))
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
                    {t('mainTitle')}
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.centerText} >
                    {t('mainSubtitle')}
                </ThemedText>
                <Button type="primary" size='large' title={t('addToDoTitle')} action={() => setShowAddTodo(!showAddTodo)} />

            </ThemedView>
            <ModalUi isVisible={showAddTodo} title={t('addToDoTitle')}  subtitle={t('addToDoSubtitle')}  onAccept={() => { handleAddTodo() }} onClose={() => { setShowAddTodo(false); setDescription(''); setTitle('') }}>

                <View style={{ gap: 20 }}>
                    <ThemedTextInput title='Título' placeholder={t('title')} value={title} onChangeText={setTitle} />
                    <ThemedTextInput title='Descripción' placeholder={t('description')} value={description} onChangeText={setDescription} />

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
