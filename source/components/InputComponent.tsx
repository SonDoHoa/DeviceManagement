import {
   View,
   TextInput,
   TouchableOpacity,
   StyleSheet,
   KeyboardType,
   ViewStyle,
   StyleProp,
   Keyboard,
} from 'react-native';
import React, { ReactNode, useState } from 'react';
import { globalStyles } from '../utilities/styles/globalStyles';
import { appColors } from '../utilities/contants/appColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
   placeholder?: string;
   onChange: (val: string) => void;
   value: string;
   isPassword?: boolean;
   isClear?: boolean;
   frontIcon?: ReactNode;
   backIcon?: ReactNode;
   type?: KeyboardType;
   style?: StyleProp<ViewStyle>;
   editable?: boolean;
}

const InputComponent = (props: Props) => {
   const {
      placeholder,
      onChange,
      value,
      isPassword,
      isClear,
      frontIcon,
      backIcon,
      type,
      style,
      editable,
   } = props;

   const [isShow, setIsShow] = useState(isPassword ?? false);

   return (
      <View style={[styles.container, style]}>
         {frontIcon && frontIcon}
         <TextInput
            style={[globalStyles.container, globalStyles.text, styles.input]}
            value={value}
            onChange={(event) => onChange(event.nativeEvent.text)}
            placeholderTextColor={'#747688'}
            secureTextEntry={isShow}
            keyboardType={type ? type : 'default'}
            placeholder={placeholder ?? 'abc@email.com'}
            editable={editable ?? true}
         />
         {backIcon && backIcon}
         <TouchableOpacity
            onPress={() => {
               isPassword ? setIsShow(!isShow) : onChange('');
               Keyboard.dismiss();
            }}>
            {isPassword ? (
               <FontAwesome
                  name={isShow ? 'eye' : 'eye-slash'}
                  size={22}
                  color={appColors.gray}
               />
            ) : (
               value &&
               isClear && <AntDesign name="close" size={22} color={appColors.gray} />
            )}
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      borderWidth: 1,
      borderColor: '#E4DFDF',
      borderRadius: 12,
      flexDirection: 'row',
      minHeight: 56,
      paddingHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
   },
   input: {
      paddingHorizontal: 14,
      flex: 1,
   },
});

export default InputComponent;
