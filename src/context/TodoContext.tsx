import { useTodos as useTodosHook } from '@/hooks/useTodos';
import { createContext, ReactNode, useContext } from 'react';

type TodoContextType = ReturnType<typeof useTodosHook>;

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const todos = useTodosHook();

  return (
    <TodoContext.Provider value={todos}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error(
      'useTodos debe usarse dentro de TodoProvider'
    );
  }

  return context;
}