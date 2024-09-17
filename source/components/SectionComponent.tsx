import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';

interface Props {
   children: ReactNode;
   style?: StyleProp<ViewStyle>;
}

const SectionComponent = (props: Props) => {
   const { style, children } = props;
   return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
   container: { paddingHorizontal: 20 },
});

export default SectionComponent;
