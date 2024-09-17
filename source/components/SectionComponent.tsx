import {StyleProp, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SectionComponent = (props: Props) => {
  const {style, children} = props;
  return <View style={[{paddingHorizontal: 20}, style]}>{children}</View>;
};

export default SectionComponent;
