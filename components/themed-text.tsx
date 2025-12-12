import { Text, TextProps } from 'react-native';
import { theme } from '../lib/theme';

export function ThemedText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{ fontSize: theme.typography.body, color: theme.colors.text }, props.style]}
    />
  );
}
