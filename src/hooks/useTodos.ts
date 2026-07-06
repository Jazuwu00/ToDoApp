import { useEffect, useState } from "react";
import { createTodo, deleteTodo, editTodo, getTodoById, getTodos } from "./todoStorage";

export function useTodos() {

    const [todos, setTodos] = useState<Todo[]>([]);

    const refresh = async () => {
        const data = await getTodos();
        setTodos(data);
    };

    const addTodo = async (todo: Todo) => {
        await createTodo(todo);
        await refresh();
    };

    const todoById = async (id: string): Promise<Todo | null> => {
        return await getTodoById(id);
    };
    const updateTodo = async (todo: Todo) => {
        await editTodo(todo);
        await refresh();
    };

    const removeTodo = async (id: string) => {
        await deleteTodo(id);
        await refresh();
    };

    useEffect(() => {
        refresh();
    }, []);

    return {
        todos,
        todoById,
        addTodo,
        updateTodo,
        removeTodo,
        refresh,
    };
}