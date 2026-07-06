import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_KEY = 'todos';


// Crear un todo
export const createTodo = async (todo: Todo) => {
  try {
    const todos = await getTodos();
    const updatedTodos = [...todos, todo];
    await AsyncStorage.setItem(
      TODOS_KEY,
      JSON.stringify(updatedTodos)
    );

    return todo;
  } catch (error) {
    console.log('Error creating todo:', error);
  }

};
// Obtener todos los todos

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const data = await AsyncStorage.getItem(TODOS_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
// Obtener un todo por id
export const getTodoById = async (id: string): Promise<Todo | null> => {
  try {
    const todos = await getTodos();
    return todos.find((todo) => todo.id === id) || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Editar un todo
export const editTodo = async (todo: Todo) => {
  try {
    const todos = await getTodos();
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? todo : t
    );

    await AsyncStorage.setItem(
      TODOS_KEY,
      JSON.stringify(updatedTodos)
    );
  } catch (error) {
    console.log('Error editing todo:', error);
    throw error;
  } 
};

// Eliminar un todo
export const deleteTodo = async (id: string) => {
  try {
    const todos = await getTodos();

    const updated = todos.filter(
      todo => todo.id !== id
    );

    await AsyncStorage.setItem(
      TODOS_KEY,
      JSON.stringify(updated)
    );
  } catch (error) {
    console.log('Error deleting todo:', error);
    throw error;
  } 
}


//eliminar todo

export const deleteData =async()=>{
  await AsyncStorage.clear();
}