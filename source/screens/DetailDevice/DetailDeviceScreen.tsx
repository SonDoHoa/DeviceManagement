import { View } from 'react-native';
import React from 'react';
import SectionComponent from '../../components/SectionComponent';
import { Image } from 'react-native-svg';
import TextComponent from '../../components/TextComponent';
import RowComponent from '../../components/RowComponent';
import ContainerComponent from '../../components/ContainerComponent';
import { ArrowLeft, ArrowRight, Calendar, Call, Location, Sms, User } from 'iconsax-react-native';
import { appColors } from '../../utilities/contants/appColor';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

const DetailDeviceScreen = ({route, navigation} : any) => {
    const {name, description, quantity, status, note, fee} = route.params.item;

  return (
   //  <View>
   //    <SectionComponent>
   //       <Image source={require('../../assets/images/DefaultImage.png')}/>
   //    </SectionComponent>
   //    <SectionComponent>
   //       <RowComponent>
   //          <TextComponent text={name} isTitle/>
   //          <TextComponent text={quantity} isTitle/>
   //       </RowComponent>
   //       <RowComponent>
   //          <TextComponent text={fee} />
   //          <TextComponent text={status} />
   //       </RowComponent>
   //       <TextComponent text={description} />
   //       <TextComponent text={note} />
   //    </SectionComponent>
   //  </View>


<ContainerComponent
       isBackgroundImage
       isScroll
       left={<ArrowLeft size={35} color={appColors.black} />}
       onPressLeft={() => navigation.goBack()}>
       <SectionComponent>
         <TextComponent
           text="Detail Information"
           color={appColors.black}
           isTitle
           style={{marginBottom: 16}}
         />
         <InputComponent
           onChange={val => {
            //  setFullName(val);
           }}
           value={name}
           placeholder="Full name"
           isClear
           style={{marginBottom: 20}}
           frontIcon={<User size={22} color={appColors.gray} />}
         />
         <InputComponent
           onChange={val => {
            //  setPhoneNumber(val);
           }}
           value={description}
           placeholder="Phone number"
           isClear
           style={{marginBottom: 20}}
           frontIcon={<Call size={22} color={appColors.gray} />}
         />
         <InputComponent
           onChange={val => {
            //  if (errors.delete('email')) {
            //    setErrors(errors);
            //  }
            //  setEmail(val);
           }}
           value={quantity}
           type="email-address"
           isClear
           style={{marginBottom: 20}}
           frontIcon={<Sms size={22} color={appColors.gray} />}
         />
         <InputComponent
           onChange={val => {
            //  if (errors.delete('email')) {
            //    setErrors(errors);
            //  }
            //  setDayOfBirth(val);
           }}
           placeholder="Day of birth"
           value={status}
           type="email-address"
           isClear
           style={{marginBottom: 20}}
           frontIcon={<Calendar size={22} color={appColors.gray} />}
         />
         <InputComponent
           onChange={val => {
            //  if (errors.delete('email')) {
            //    setErrors(errors);
            //  }
            //  setAddress(val);
           }}
           placeholder="Address"
           value={fee}
           type="email-address"
           isClear
           style={{marginBottom: 20}}
           frontIcon={<Location size={22} color={appColors.gray} />}
         />
         {/* {errors &&
           Array.from(errors).map(([key, value]) => (
             <TextComponent
               key={key}
               text={value}
               color={appColors.red}
               style={{marginBottom: 16}}
             />
           ))} */}
       </SectionComponent>
       <SectionComponent>
         <ButtonComponent
           title="REGISTER"
           type="button"
           onPress={() => {}}
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
  );
};

export default DetailDeviceScreen;
