import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing, themePadding } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function CustomNotFound() {
  return (
    <ThemedView style={{flex:1}}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.container}>
            <ThemedText type='title' style={styles.title}>Not Found</ThemedText>
          </ThemedView>
          </SafeAreaView>
</ThemedView>  
  )
}

export default CustomNotFound

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    gap: themePadding.xl,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    maxWidth: MaxContentWidth,

  },
  safeArea: {
    flex: 1,
    
    maxWidth: MaxContentWidth,
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 52,
  }
});
