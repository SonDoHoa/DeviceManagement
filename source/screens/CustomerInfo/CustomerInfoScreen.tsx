import { View } from 'react-native';
import React, { useState } from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import SectionComponent from '../../components/SectionComponent';
import TextComponent from '../../components/TextComponent';
import InputComponent from '../../components/InputComponent';
import { appColors } from '../../utilities/contants/appColor';
import ButtonComponent from '../../components/ButtonComponent';
import {Sms, ArrowRight, ArrowLeft, User, Call, Calendar, Location} from 'iconsax-react-native';
import { NavigationConstants } from '../../navigation/NavigationConstants';

const CustomerInfoScreen = ({navigation}: any) => {
   const [fullName, setFullName] = useState<string>('');
   const [phoneNumber, setPhoneNumber] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [address, setAddress] = useState<string>('');
   const [dayOfBirth, setDayOfBirth] = useState<string>('');
   const [errors, setErrors] = useState<Map<string, string>>(new Map());

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
       navigation.navigate(NavigationConstants.DevicesScreen);
     }
     navigation.navigate(NavigationConstants.DevicesScreen);
   };

   return (
     <ContainerComponent
       isBackgroundImage
       isScroll
       left={<ArrowLeft size={35} color={appColors.black} />}
       onPressLeft={() => navigation.goBack()}>
       <SectionComponent>
         <TextComponent
           text="Customer Information"
           color={appColors.black}
           isTitle
           style={{marginBottom: 16}}
         />
         <InputComponent
           onChange={val => {
             setFullName(val);
           }}
           value={fullName}
           placeholder="Full name"
           isClear
           style={{marginBottom: 20}}
           frontIcon={<User size={22} color={appColors.gray} />}
         />
         <InputComponent
           onChange={val => {
             setPhoneNumber(val);
           }}
           value={phoneNumber}
           placeholder="Phone number"
           isClear
           style={{marginBottom: 20}}
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
           style={{marginBottom: 20}}
           frontIcon={<Sms size={22} color={appColors.gray} />}
         />
         <InputComponent
           onChange={val => {
             if (errors.delete('email')) {
               setErrors(errors);
             }
             setDayOfBirth(val);
           }}
           placeholder="Day of birth"
           value={dayOfBirth}
           type="email-address"
           isClear
           style={{marginBottom: 20}}
           frontIcon={<Calendar size={22} color={appColors.gray} />}
         />
         <InputComponent
           onChange={val => {
             if (errors.delete('email')) {
               setErrors(errors);
             }
             setAddress(val);
           }}
           placeholder="Address"
           value={address}
           type="email-address"
           isClear
           style={{marginBottom: 20}}
           frontIcon={<Location size={22} color={appColors.gray} />}
         />
         {errors &&
           Array.from(errors).map(([key, value]) => (
             <TextComponent
               key={key}
               text={value}
               color={appColors.red}
               style={{marginBottom: 16}}
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
               style={{
                 padding: 7,
                 borderRadius: 10000,
                 backgroundColor: '#4C60EC',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}>
               <ArrowRight size={23} color={appColors.white} />
             </View>
           }
         />
       </SectionComponent>
     </ContainerComponent>
);};

// const styles = StyleSheet.create({});

export default CustomerInfoScreen;
