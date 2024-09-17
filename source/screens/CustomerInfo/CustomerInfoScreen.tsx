import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import SectionComponent from '../../components/SectionComponent';
import TextComponent from '../../components/TextComponent';
import InputComponent from '../../components/InputComponent';
import { appColors } from '../../utilities/contants/appColor';
import ButtonComponent from '../../components/ButtonComponent';
import { Sms, ArrowRight, User, Call, Calendar, Location } from 'iconsax-react-native';
import { NavigationConstants } from '../../navigation/NavigationConstants';
import { useAppDispatch } from '../../redux/Hooks';
import { CustomerState, CustomerUpdate } from '../../redux/Reducers/CustomerSlice';

const CustomerInfoScreen = ({ navigation }: any) => {
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
         mErrors.set('all', 'Please fill up fields');
      } else {
         if (!email) {
            mErrors.set('email', 'Please fill in your email');
         }

         if (!fullName) {
            mErrors.set('fullName', 'Please fill in your Full name');
         }

         if (!address) {
            mErrors.set('address', 'Please fill in your address');
         }

         if (!dayOfBirth) {
            mErrors.set('dayOfBirth', 'Please fill in your day of birth');
         }

         if (!phoneNumber) {
            mErrors.set('phoneNumber', 'Please fill in your phone number');
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
         navigation.navigate(NavigationConstants.DevicesScreen);
      }
   };

   return (
      <ContainerComponent
         isBackgroundImage
         headerTitle=""
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
                  onChange={val => {
                     if (errors.delete('fullName')) {
                        setErrors(errors);
                     }
                     setFullName(val);
                  }}
                  value={fullName}
                  placeholder="Full name"
                  isClear
                  style={styles.marginBottom}
                  frontIcon={<User size={22} color={appColors.gray} />}
               />
               <InputComponent
                  onChange={val => {
                     if (errors.delete('phoneNumber')) {
                        setErrors(errors);
                     }
                     setPhoneNumber(val);
                  }}
                  value={phoneNumber}
                  placeholder="Phone number"
                  isClear
                  style={styles.marginBottom}
                  frontIcon={<Call size={22} color={appColors.gray} />}
               />
               <InputComponent
                  onChange={val => {
                     if (errors.delete('email')) {
                        setErrors(errors);
                     }
                     setEmail(val);
                  }}
                  value={email}
                  type="email-address"
                  isClear
                  style={styles.marginBottom}
                  frontIcon={<Sms size={22} color={appColors.gray} />}
               />
               <InputComponent
                  onChange={val => {
                     if (errors.delete('dayOfBirth')) {
                        setErrors(errors);
                     }
                     setDayOfBirth(val);
                  }}
                  placeholder="Day of birth"
                  value={dayOfBirth}
                  type="email-address"
                  isClear
                  style={styles.marginBottom}
                  frontIcon={<Calendar size={22} color={appColors.gray} />}
               />
               <InputComponent
                  onChange={val => {
                     if (errors.delete('address')) {
                        setErrors(errors);
                     }
                     setAddress(val);
                  }}
                  placeholder="Address"
                  value={address}
                  type="email-address"
                  isClear
                  style={styles.marginBottom}
                  frontIcon={<Location size={22} color={appColors.gray} />}
               />
               {errors &&
                  Array.from(errors).map(([key, value]) => (
                     <TextComponent
                        key={key}
                        text={value}
                        color={appColors.red}
                        style={styles.marginBottomLess}
                     />
                  ))}
            </SectionComponent>
            <SectionComponent>
               <ButtonComponent
                  title="REGISTER"
                  type="button"
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
   marginBottom: { marginBottom: 20 },
   marginBottomLess: { marginBottom: 16 },
   buttonRegister: {
      padding: 7,
      borderRadius: 10000,
      backgroundColor: '#4C60EC',
      justifyContent: 'center',
      alignItems: 'center',
   },
   view: { borderWidth: 1, flex: 1, justifyContent: 'center' },
});

export default CustomerInfoScreen;
