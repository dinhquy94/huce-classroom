import React, { ReactElement, useEffect } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Button, Input, Layout, StyleService, Text, useStyleSheet, Icon, Spinner } from '@ui-kitten/components';
import { PersonIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { Formik } from 'formik'
import * as yup from 'yup'
import { signIn } from '../../../services/signup.service'
import Toast from 'react-native-toast-message';
import * as Keychain from 'react-native-keychain'; 
import { useDispatch, useSelector } from 'react-redux';
import { LogIn, selectAuth } from '../../../redux/Auth/slice';
import { ImageOverlay } from './extra/image-overlay.component';


const LoginComponent =  (props): React.ReactElement => {
  
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectAuth)
    
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  
  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    props.navigation && props.navigation.navigate('Signup');
  };
 
  useEffect(() => {
    if (isSuccess) {
      props.navigation.navigate('Home');
    }
  })

  const onForgotPasswordButtonPress = (): void => {
    // navigation && navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
       <ImageOverlay
        style={styles.container}
        source={require('./assets/image-background.jpg')}>
          
      <View style={styles.headerContainer}>
        <Text
          category='h1'
          status='control'>
          QLearning
        </Text>
        <Text
          style={styles.signInLabel}
          category='s1'
          status='control'>
          ????ng nh???p t??i kho???n
        </Text>
        <View style={styles.spinnerLoading} >
        {isLoading && <Spinner status='basic'/>}
        </View>
      </View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: 'dinhquy944@gmail.com', password: '12345678abc' }}
        onSubmit={ values => { 
          dispatch(LogIn(values))
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View
              style={styles.formContainer}>
              <Input
                placeholder='Email'
                name='email'
                status='control'
                accessoryRight={PersonIcon} 
                onChangeText={handleChange('email')}
                value={values.email} 
              />
              {errors.email &&
                <Text style={styles.validationError}>{errors.email}</Text>
              }
              <Input
                style={styles.passwordInput}
                placeholder='Password'
                name='password' 
                status='control'
                accessoryRight={renderPasswordIcon}
                secureTextEntry={!passwordVisible}
                onChangeText={handleChange('password')}
               
                value={values.password} 
              /> 
              {errors.password &&
                <Text style={styles.validationError}>{errors.password}</Text>
              }
              <View style={styles.forgotPasswordContainer}>
                <Button
                  style={styles.forgotPasswordButton}
                  appearance='ghost'
                  status='basic'
                  onPress={onForgotPasswordButtonPress}>
                  Qu??n m???t kh???u
                </Button>
              </View>
            </View>
            <Button
              style={styles.signInButton}
              onPress={handleSubmit}
              disabled={!isValid }
              size='giant'>
              ????ng nh???p
            </Button>
            <Button
              style={styles.signUpButton}
              appearance='ghost'
              status='basic'
              onPress={onSignUpButtonPress}>
              T???o t??i kho???n m???i
            </Button>
          </>
        )}
      </Formik>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Vui l??ng nh???p ????ng ?????a ch??? email")
    .required('?????a ch??? email kh??ng ???????c ????? tr???ng'),
  password: yup
    .string()
    .min(8, ({ min }) => `M???t kh???u ph???i t???i thi???u ${min} k?? t???.`)
    .required('M???t kh???u l?? b???t bu???c.'),
})


const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  validationError: { 
    fontSize: 10, 
    color: 'red',
    marginTop: 3
  },
  spinnerLoading: {
    marginTop: 10
  }
});

export default LoginComponent