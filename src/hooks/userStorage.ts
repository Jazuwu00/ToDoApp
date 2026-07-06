import AsyncStorage from '@react-native-async-storage/async-storage';


const USER_KEY = 'user';

export const getUser = async (): Promise<User | null> => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setUser = async (user: User): Promise<void> => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};
export const clearUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(USER_KEY);
};