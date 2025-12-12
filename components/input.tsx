
import { StyleSheet, TextInput, View } from 'react-native';
import { theme } from '../lib/theme';

export function Input(props: any) {
  return (
    <View style={styles.wrap}>
      <TextInput
        {...props}
        style={styles.input}
        textAlign="right"
        placeholderTextColor={theme.colors.muted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  input: {
    padding: 12,
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
});
