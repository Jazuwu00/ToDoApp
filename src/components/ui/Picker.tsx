import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
export function ThemedPicker({ value, onChange, style }: { value: boolean; onChange: (e: any) => void; style?: any }) {
  const theme = useTheme();
  const styles = useStyles();
  const {t}= useTranslation()
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.picker}
        dropdownIconColor={'white'}
        mode='dropdown'
      >
        <Picker.Item style={styles.text} label={t('onGoing')} value={false} />
        <Picker.Item style={styles.text} label={t('completed')}value={true} />
      </Picker>
    </View>
  );
}
function useStyles() {
  const theme = useTheme();


  return StyleSheet.create({
    text: {
      fontSize: 14,
      fontWeight: '500',
      fontFamily: Fonts.sans,
      color: theme.backgroundElement,

    },
    pickerContainer: {
      backgroundColor: 'transparent',
      borderBottomColor: '#F9F5FB',
      borderBottomWidth: 0.5,
    },
    picker: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '500',

      textTransform: 'capitalize',
      fontFamily: Fonts.sans,
    }
  })
}
