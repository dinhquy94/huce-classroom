import React from 'react';
import { View } from 'react-native';
import {
  Button,
  CheckBox,
  Datepicker,
  Divider,
  Input,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import {
  ArrowForwardIconOutline,
  FacebookIcon,
  GoogleIcon,
  HeartIconFill,
  TwitterIcon,
} from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { Formik } from 'formik'
import { signUp } from '../../../services/signup.service'
import * as yup from 'yup'
import Toast from 'react-native-toast-message';
import { Spinner } from '@ui-kitten/components';

export default ({ navigation }): React.ReactElement => {

  var isLoading: Boolean = false;
  const styles = useStyleSheet(themedStyles);
   
  const onSignUpButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('SignIn1');
  };

  const renderCheckboxLabel = React.useCallback(
    (evaProps) => (
      <Text {...evaProps} style={styles.termsCheckBoxText}>
        By creating an account, I agree to the Ewa Terms of\nUse and Privacy
        Policy
      </Text>
    ),
    []
  ); 
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.orContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.orLabel} category='h5'>
          ĐĂNG KÝ TÀI KHOẢN
        </Text> 
        <Divider style={styles.divider} /> 
      </View>
      { isLoading && <View  style={styles.spinner}>
        <Spinner status='info'/>
      </View>
      }
      <Formik
        validationSchema={signUpValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{ 
          email: '', 
          password: '',
          name: '',
          phone: '',
          termsAccepted: false
        }}
        onSubmit={async values => {
          isLoading = true;
          var data = {
            "email": values.email,
            "name": values.name,
            "phone": values.phone,
            "password": values.password,
          }
          const result = await signUp(data); 
          if(!result.success) {
            Toast.show({
              type: 'error',
              text1: 'Đăng ký không thành công',
              text2: result.response.data.message
            }); 
          }else {
            Toast.show({
              type: 'success',
              text1: 'Đăng ký tài khoản thành công',
              text2: "Vui lòng đăng nhập"
            }); 
            navigation && navigation.navigate('Login', { resgisterData: data });
          }
          isLoading = false;
        }}
      >
        {({
           handleChange,
           handleBlur,
           handleSubmit,
           values,
           errors,
           isValid,
          setFieldValue
        }) => (
          <>

            <View style={[styles.container, styles.formContainer]}>
              <Input
                placeholder=''
                label='HỌ VÀ TÊN'
                name="name"
                autoCapitalize='words' 
                onChangeText={handleChange('name')}
                value={values.name}  
              />
              {errors.name &&
                <Text style={styles.validationError}>{errors.name}</Text>
              }
              <Input
                style={styles.formInput}
                placeholder='example@gmail.com'
                label='EMAIL'
                name="email"
                onChangeText={handleChange('email')}
                value={values.email} 
              />
              {errors.email &&
                <Text style={styles.validationError}>{errors.email}</Text>
              }
              <Input
                style={styles.formInput}
                label='MẬT KHẨU'
                placeholder='Tối thiểu 8 ký tự'
                name="password"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                value={values.password} 
              />
              {errors.password &&
                <Text style={styles.validationError}>{errors.password}</Text>
              }
              <Input
                style={styles.formInput}
                label='SỐ ĐIỆN THOẠI'
                name="phone"
                placeholder=''
                onChangeText={handleChange('phone')}
                value={values.phone} 
              />  
              <CheckBox
                style={styles.termsCheckBox}
                checked={values.termsAccepted}  
                name="termsAccepted" 
                value={values.termsAccepted} 
                onChange={(val) => setFieldValue('termsAccepted', !values.termsAccepted)}
                >
                {renderCheckboxLabel}
              </CheckBox>
              {errors.termsAccepted &&
                <Text style={styles.validationError}>{errors.termsAccepted}</Text>
              }
            </View>

            <Button
              style={styles.signUpButton}
              size='large'
              disabled={isLoading}
              onPress={handleSubmit}> 
              ĐĂNG KÝ
            </Button>
          </>)}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    minHeight: 216,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 44,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  signInLabel: {
    flex: 1,
  },
  signInButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  socialAuthIcon: {
    tintColor: 'text-basic-color',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 52,
  },
  divider: {
    flex: 1,
  },
  orLabel: {
    marginHorizontal: 8,
  },
  emailSignLabel: {
    alignSelf: 'center',
    marginTop: 5,
  },
  formInput: {
    marginTop: 16,

  },
  termsCheckBox: {
    marginTop: 20,
  },
  termsCheckBoxText: {
    fontSize: 11,
    lineHeight: 14,
    color: 'text-hint-color',
    marginLeft: 10,
  },
  validationError: { 
    fontSize: 10, 
    color: 'red',
    marginTop: 3
  },
  spinner: {
    flexDirection:'row',
    justifyContent:'center',
    marginTop: 10
  }
});


// if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//   return helpers.message('password must contain at least 1 letter and 1 number');
// }
const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Vui lòng nhập đúng địa chỉ email")
    .required('Địa chỉ email không được để trống'),
  password: yup
    .string()
    .min(8, ({ min }) => `Mật khẩu phải tối thiểu ${min} ký tự.`)
    .required('Mật khẩu là bắt buộc.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 ký tự và 1 số"
    ),
  name: yup
    .string() 
    .required('Tên không được để trống'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
})
