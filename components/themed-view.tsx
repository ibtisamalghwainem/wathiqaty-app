import { View, ViewProps } from 'react-native';
import { theme } from '../lib/theme';

export function ThemedView(props: ViewProps) {
  return (
    <View
      {...props}
      style={[{ backgroundColor: theme.colors.background }, props.style]}
    />
  );
}
