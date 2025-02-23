import { View } from 'react-native';
// import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export function ThemedView({ style, lightColor, darkColor, ...otherProps }) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function useThemeColor(props, colorName) { // Only ONE declaration!
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  return colorFromProps || Colors[theme][colorName];
}