import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeroContent from '@/components/HeroContent';
import { ThemedView } from '@/components/themed-view';
import TodosContent from '@/components/TodosContent';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';



export default function HomeScreen() {

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ gap: Spacing.five }}>
        <SafeAreaView style={styles.safeArea}>
          <HeroContent/>
          <TodosContent/>
        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  safeArea: {
    flex: 1,
    gap: Spacing.four,
    paddingVertical: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },

  scrollView: {
    flex: 1,
  },

});

