import React from 'react';
import { ScrollView } from 'react-native';
import { Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { ProfileSetting } from './extra/profile-setting.component';
import { CameraIcon } from './extra/icons';
import { Profile } from './extra/data';
import DocumentPicker from 'react-native-document-picker'
import { uploadFile } from '../../services/classes';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../services/config';
import { updateUserApi } from '../../services/user.service';
import { getFeeds, setCurrentInfo } from '../../redux/Classroom/slice';

const profile: Profile = Profile.jenniferGreen();

export default ({ navigation }): React.ReactElement => {

  const styles = useStyleSheet(themedStyle);

  const onDoneButtonPress = (): void => {
    // navigation && navigation.goBack();
  };

  const dispatch = useDispatch(); 
  const { userInfo } = useSelector(getFeeds)

  const chosePicture = async() => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      }) 
      const image:any = await doUpload(results);
      if(image.data.length > 0) {
        console.log(image.data[0])
        const updatedInfo = { 
          avatar: image.data[0].filename
        };
        const newUser = await updateUserApi(userInfo.id, updatedInfo) 
        if(newUser) {
          dispatch(setCurrentInfo(newUser))
        } 
      }
    } catch(error) { 
      console.log(error)
    }
  }

  const doUpload = async (results: any) => {
    // setFileUpload(results)
    if (results.length > 0) {
        const data = new FormData()
        data.append('files', {
            uri: results[0].uri,
            // @ts-ignore
            type: results[0].type, // or photo.type
            name: results[0].name,
        })
       
        const result = await uploadFile(data); 
        return result;
    }
    return null
}

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status='basic'
      onPress={chosePicture}
      accessoryLeft={CameraIcon}
    />
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ProfileAvatar
        style={styles.profileAvatar}
        source={ userInfo.avatar ? {uri: baseUrl.concat("/v1/media/attatchment/").concat(userInfo.avatar)} : require('./assets/image-profile.jpeg')}
        editButton={renderPhotoButton}
      />
      <ProfileSetting
        style={[styles.profileSetting, styles.section]}
        hint='Họ tên'
        value={userInfo.name}
      />     
      <ProfileSetting
        style={[styles.profileSetting, styles.section]}
        hint='Email'
        value={userInfo.email}
      />
      <ProfileSetting
        style={[styles.profileSetting]}
        hint='Xác minh email'
        value={userInfo.isEmailVerified ? 'Đã xác minh' : 'Chưa xác minh'}
      />
      <ProfileSetting
        style={[styles.profileSetting]}
        hint='Địa chỉ'
        value={userInfo.address}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint='Phone Number'
        value={userInfo.phone}
      />
      <Button
        style={styles.doneButton}
        onPress={onDoneButtonPress}>
        DONE
      </Button>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  contentContainer: {
    paddingVertical: 24,
  },
  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: 'center',
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});
