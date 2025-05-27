import Icon from '@react-native-vector-icons/ionicons';
import {useTheme} from '@ui-kitten/components';
import React from 'react';
// import {StyleSheet} from 'react-native';

interface Props {
  name: string;
  size?: number;
  color?: string;
  white?: boolean;
}
export const MyIcon = ({name, size = 32, color, white = false}: Props) => {
  const theme = useTheme();

  if (white) {
    color = theme['color-info-100'];
  } else if (!color) {
    color = theme['text-basic-color'];
  } else {
    color = theme[color];
  }
  console.log('COlor: ', color);
  return (
    <Icon
      //   style={styles.icon}
      size={size}
      name={name as any}
      color={white ? 'white' : color}
      // color="#222B45"
    />
  );
};

// const styles = StyleSheet.create({
//   icon: {
//     width: 32,
//     height: 32,
//     backgroundColor: 'red',
//   },
// });
