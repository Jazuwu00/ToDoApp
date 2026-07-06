import Toast from 'react-native-toast-message';

const ErrorToast = (errorMessage: string) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: errorMessage || 'Ocurrió un error.',
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
    
  });
};

export default ErrorToast;
