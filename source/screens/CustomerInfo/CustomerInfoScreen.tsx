import { StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import SectionComponent from '../../components/SectionComponent';
import TextComponent from '../../components/TextComponent';
import InputComponent from '../../components/InputComponent';
import { appColors } from '../../utilities/Contants/appColor';
import ButtonComponent from '../../components/ButtonComponent';
import { Sms, ArrowRight, User, Call, Calendar, Location } from 'iconsax-react-native';
import { NavigationConstants } from '../../navigation/NavigationConstants';
import { useAppDispatch } from '../../redux/Hooks';
import { CustomerState, CustomerUpdate } from '../../redux/Reducers/CustomerSlice';
import { appInfo } from '../../utilities/Contants/appInfo';

type InputType = 'phoneNumber' | 'fullName' | 'email' | 'address' | 'dayOfBirth';

enum INPUT_TYPES {
   PhoneNumber = 'phoneNumber',
   Name = 'fullName',
   Email = 'email',
   Address = 'address',
   Birth = 'dayOfBirth'
}

const CustomerInfoScreen = ({ navigation, route }: any) => {

   const [fullName, setFullName] = useState<string>('');
   const [phoneNumber, setPhoneNumber] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [address, setAddress] = useState<string>('');
   const [dayOfBirth, setDayOfBirth] = useState<string>('');
   const [errors, setErrors] = useState<Map<string, string>>(new Map());
   const dispatch = useAppDispatch();

   const handleRegister = () => {
      const mErrors = new Map<string, string>();
      if (!email || !fullName || !phoneNumber || !address || !dayOfBirth) {
         mErrors.set('all', 'Please fill up missing fields');
      } else {

         const mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if (email && !mailRegex.test(email)) {
            mErrors.set('email', 'Please enter email in correct format');
         }

         const nameRegex = /[\da-zA-Zㄱ-ㆌ]{5,12}/;
         if (fullName && !nameRegex.test(fullName)) {
            mErrors.set('fullName', 'begins with a letter and has at least 4 characters');
         }

         const addressRegex = /^\s*\S+(?:\s+\S+){2}/;
         if (address && !addressRegex.test(address)) {
            mErrors.set('address', 'Please enter address in correct format');
         }

         const birthDateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
         if (dayOfBirth && !birthDateRegex.test(dayOfBirth)) {
            mErrors.set('dayOfBirth', 'dd/mm/yyyy, dd-mm-yyyy or dd.mm.yyyy');
         }

         const phoneNumberRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
         if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
            mErrors.set('phoneNumber', 'Please enter the phone number in the format like 0971989877');
         }
      }

      if (mErrors.size > 0) {
         setErrors(mErrors);
      } else {
         console.log('Sign up success');
         const customerInfo: CustomerState = {
            fullName: fullName,
            address: address,
            dayOfBirth: dayOfBirth,
            email: email,
            phoneNumber: phoneNumber,
         };
         dispatch(CustomerUpdate(customerInfo));
         if (route?.params?.prevScreen !== undefined) {
            navigation.navigate(route.params.prevScreen);
         } else {
            navigation.navigate(NavigationConstants.DevicesScreen);
         }
      }
   };

   const handleInputChange = useCallback((text: string, type: InputType) => {
      if (errors.delete(type)) {
         setErrors(errors);
      }
      switch (type) {
         case INPUT_TYPES.PhoneNumber:
            setPhoneNumber(text);
            break;
         case INPUT_TYPES.Address:
            setAddress(text);
            break;
         case INPUT_TYPES.Birth:
            setDayOfBirth(text);
            break;
         case INPUT_TYPES.Email:
            setEmail(text);
            break;
         case INPUT_TYPES.Name:
            setFullName(text);
            break;
         default:
            break;
      }
   }, [errors, setErrors, setPhoneNumber, setAddress, setDayOfBirth, setEmail, setFullName]);

   console.log('---------- CustomerInfoScreen ----------');
   return (
      <ContainerComponent
         isBackgroundImage
      >
         <View style={styles.view}>
            <SectionComponent>
               <TextComponent
                  text="Customer Information"
                  color={appColors.black}
                  isTitle
                  style={styles.marginBottomLess}
               />
               <InputComponent
                  onChange={(text) => handleInputChange(text, INPUT_TYPES.Name)}
                  value={fullName}
                  placeholder="Full name"
                  isClear
                  style={styles.marginBottom}
                  frontIcon={<User size={22} color={appColors.gray} />}
               />
               <InputComponent
                  onChange={(text) => handleInputChange(text, INPUT_TYPES.PhoneNumber)}
                  value={phoneNumber}
                  placeholder="Phone number"
                  isClear
                  style={styles.marginBottom}
                  frontIcon={<Call size={22} color={appColors.gray} />}
               />
               <InputComponent
                  onChange={(text) => handleInputChange(text, INPUT_TYPES.Email)}
                  value={email}
                  type="email-address"
                  isClear
                  style={styles.marginBottom}
                  frontIcon={<Sms size={22} color={appColors.gray} />}
               />
               <InputComponent
                  onChange={(text) => handleInputChange(text, INPUT_TYPES.Birth)}
                  placeholder="Day of birth"
                  value={dayOfBirth}
                  type="email-address"
                  isClear
                  style={styles.marginBottom}
                  frontIcon={<Calendar size={22} color={appColors.gray} />}
               />
               <InputComponent
                  onChange={(text) => handleInputChange(text, INPUT_TYPES.Address)}
                  placeholder="Address"
                  value={address}
                  type="email-address"
                  isClear
                  style={styles.marginBottom}
                  frontIcon={<Location size={22} color={appColors.gray} />}
               />
               {
                  errors ?
                     Array.from(errors).map(([key, value]) => (
                        <TextComponent
                           key={key}
                           text={value}
                           color={appColors.red}
                           style={styles.marginBottomLess}
                        />
                     ))
                     : null
               }
            </SectionComponent>
            <SectionComponent>
               <ButtonComponent
                  title="REGISTER"
                  type="button"
                  style={styles.registerBtn}
                  onPress={handleRegister}
                  backIcon={
                     <View
                        style={styles.buttonRegister}>
                        <ArrowRight size={23} color={appColors.white} />
                     </View>
                  }
               />
            </SectionComponent>
         </View>
      </ContainerComponent>
   );
};

const styles = StyleSheet.create({
   marginBottom: {
      marginBottom: 20,
   },
   marginBottomLess: {
      marginBottom: 16,
   },
   buttonRegister: {
      padding: 7,
      borderRadius: 10000,
      backgroundColor: '#4C60EC',
      justifyContent: 'center',
      alignItems: 'center',
   },
   view: {
      borderWidth: 1,
      flex: 1,
      justifyContent: 'center',
   },
   registerBtn: {
      minHeight: 58,
      minWidth: appInfo.sizes.WIDTH * 0.8,
   },
});

export default CustomerInfoScreen;
