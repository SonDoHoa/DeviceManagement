import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import SectionComponent from '../../components/SectionComponent';
import TextComponent from '../../components/TextComponent';
import RowComponent from '../../components/RowComponent';
import ContainerComponent from '../../components/ContainerComponent';
import {
   ArrowLeft,
   ArrowRight,
} from 'iconsax-react-native';
import { appColors } from '../../utilities/Contants/appColor';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { DeviceState, updateDevices } from '../../redux/Reducers/DevicesSlice';
import { useDispatch } from 'react-redux';
import { appInfo } from '../../utilities/Contants/appInfo';

type InputType = 'deviceName' | 'deviceDescription' | 'deviceQuantity' | 'deviceNote' | 'deviceFee' | 'deviceStatus';

enum INPUT_TYPES {
   Name = 'deviceName',
   Description = 'deviceDescription',
   Quantity = 'deviceQuantity',
   Note = 'deviceNote',
   Fee = 'deviceFee',
   Status = 'deviceStatus'
}

const DetailDeviceScreen = ({ route, navigation }: any) => {

   const { name, description, quantity, status, note, fee, image, id } = route.params.item;

   const [deviceName, setDeviceName] = useState<string>(name);
   const [deviceDescription, setDeviceDescription] = useState<string>(description);
   const [deviceQuantity, setDeviceQuantity] = useState<string>(quantity);
   const [deviceStatus, setDeviceStatus] = useState<string>(status);
   const [deviceNote, setDeviceNote] = useState<string>(note);
   const [deviceFee, setDeviceFee] = useState<string>(fee);
   const [errors, setErrors] = useState<Map<string, string>>(new Map());
   const [isEdit, setIsEdit] = useState(false);

   const dispatch = useDispatch();

   const handleRenderDeviceImage = (): ImageSourcePropType => {
      return image ? { uri: `data:image/png;base64,${image}` } : require('../../assets/images/DefaultImage.png');
   };

   const handleEditSelect = () => {
      setIsEdit(!isEdit);
   };

   const handleEditData = () => {
      const mErrors = new Map<string, string>();
      if (!deviceName || !deviceDescription || !deviceQuantity || !deviceFee) {
         mErrors.set('all', 'Please fill up fields');
      } else {
         if (!deviceName) {
            mErrors.set('deviceName', 'Please fill in your name');
         }

         if (!deviceDescription) {
            mErrors.set('deviceDescription', 'Please fill in your description');
         }

         if (!deviceQuantity) {
            mErrors.set('deviceQuantity', 'Please fill in quantity');
         }

         if (!deviceFee) {
            mErrors.set('deviceFee', 'Please fill in fee');
         }
      }

      if (mErrors.size > 0) {
         setErrors(mErrors);
      } else {
         const updatedData: DeviceState = {
            id: id,
            image: image,
            description: deviceDescription,
            fee: deviceFee,
            name: deviceName,
            note: deviceNote,
            quantity: Number(deviceQuantity),
            status: status,
         };
         dispatch(updateDevices(updatedData));
         console.log('edit device info success: ', updatedData);
         setIsEdit(false);
      }
   };

   const goBack = () => {
      console.log('object', route.params.prevScreen);
      const updatedData: DeviceState = {
         id: id,
         image: image,
         description: deviceDescription,
         fee: deviceFee,
         name: deviceName,
         note: deviceNote,
         quantity: Number(deviceQuantity),
         status: status,
      };
      navigation.navigate(route.params.prevScreen, { deviceUpdated: updatedData });
   };

   const handleInputChange = useCallback((text: string, type: InputType) => {
      if (errors.delete(type)) {
         setErrors(errors);
      }
      switch (type) {
         case INPUT_TYPES.Description:
            setDeviceDescription(text);
            break;
         case INPUT_TYPES.Fee:
            setDeviceFee(text);
            break;
         case INPUT_TYPES.Note:
            setDeviceNote(text);
            break;
         case INPUT_TYPES.Quantity:
            setDeviceQuantity(text);
            break;
         case INPUT_TYPES.Name:
            setDeviceName(text);
            break;
         case INPUT_TYPES.Status:
            setDeviceStatus(text);
            break;
         default:
            break;
      }
   }, [errors, setErrors, setDeviceDescription, setDeviceFee, setDeviceNote, setDeviceQuantity, setDeviceName, setDeviceStatus]);

   console.log('---------- DetailDeviceScreen ----------');
   return (
      <ContainerComponent
         isBackgroundImage
         isScroll
         left={<ArrowLeft size={35} color={appColors.black} />}
         onPressLeft={goBack}
      >
         <SectionComponent>
            <TextComponent
               text="Detail Information"
               color={appColors.black}
               isTitle
               style={styles.fieldMarginBottom}
            />
            <Image source={handleRenderDeviceImage()} width={100} height={100} />
            <InputComponent
               onChange={text => handleInputChange(text, INPUT_TYPES.Name)}
               value={deviceName}
               placeholder="Device name"
               isClear={isEdit}
               editable={isEdit}
               style={styles.fieldMarginBottom}
            />
            <InputComponent
               onChange={text => handleInputChange(text, INPUT_TYPES.Description)}
               value={deviceDescription}
               placeholder="Description"
               isClear={isEdit}
               editable={isEdit}
               style={styles.fieldMarginBottom}
            />

            {
               !deviceStatus ?
                  <InputComponent
                     onChange={text => handleInputChange(text, INPUT_TYPES.Status)}
                     placeholder="Status"
                     value={'Out of stock'}
                     type="default"
                     style={styles.fieldMarginBottom}
                  />
                  :
                  <InputComponent
                     onChange={text => handleInputChange(text, INPUT_TYPES.Quantity)}
                     value={deviceQuantity.toString()}
                     placeholder="Quantity"
                     isClear={isEdit}
                     editable={isEdit}
                     style={styles.fieldMarginBottom}
                  />
            }
            <InputComponent
               onChange={text => handleInputChange(text, INPUT_TYPES.Note)}
               placeholder="Note"
               value={deviceNote}
               type="email-address"
               isClear={isEdit}
               editable={isEdit}
               style={styles.fieldMarginBottom}
            />
            <InputComponent
               onChange={text => handleInputChange(text, INPUT_TYPES.Fee)}
               placeholder="Address"
               value={deviceFee}
               type="email-address"
               isClear={isEdit}
               editable={isEdit}
               style={styles.fieldMarginBottom}
            />
            {errors ?
               Array.from(errors).map(([key, value]) => (
                  <TextComponent
                     key={key}
                     text={value}
                     color={appColors.red}
                     style={styles.fieldMarginBottom}
                  />
               )) : null
            }
         </SectionComponent>
         <SectionComponent>
            <RowComponent style={styles.footer} justify="space-between">
               {
                  isEdit ?
                     <ButtonComponent
                        title={'CANCEL'}
                        type="button"
                        onPress={handleEditSelect}
                        backgroundColor={appColors.white}
                        titleColor={appColors.black}
                        style={styles.actionBtn}
                     /> : null
               }
               <ButtonComponent
                  title={isEdit ? 'SAVE' : 'EDIT'}
                  type="button"
                  onPress={isEdit ? handleEditData : handleEditSelect}
                  backIcon={
                     <View
                        style={[styles.arrowRight, isEdit ? styles.arrowRightEdit : undefined]}>
                        <ArrowRight size={23} color={appColors.white} />
                     </View>
                  }
                  backgroundColor={isEdit ? appColors.accent : undefined}
                  style={[isEdit ? styles.actionBtn : styles.editBtn]}
               />
            </RowComponent>
         </SectionComponent>
      </ContainerComponent>
   );
};

const styles = StyleSheet.create({
   fieldMarginBottom: {
      marginBottom: 20,
   },
   arrowRight: {
      padding: 7,
      borderRadius: 10000,
      backgroundColor: '#4C60EC',
      justifyContent: 'center',
      alignItems: 'center',
   },
   arrowRightEdit: {
      backgroundColor: appColors.accent1,
   },
   footer: {
      borderColor: 'black',
      padding: 20,
      flex: 1,
   },
   actionBtn: {
      width: appInfo.sizes.WIDTH * 0.35,
      height: 50,
   },
   editBtn: {
      width: appInfo.sizes.WIDTH * 0.8,
      height: 50,
      flex: 1,
   },
});

export default DetailDeviceScreen;
