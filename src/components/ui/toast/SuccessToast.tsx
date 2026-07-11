import { t } from 'i18next';
import Toast from 'react-native-toast-message';

const SuccessToast = (SuccessMessage?: string) => {
  Toast.show({
    type: 'success',
    text1: 'Exito!',
    text2: SuccessMessage || t('SuccessMessage'),
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
};

export default SuccessToast;
