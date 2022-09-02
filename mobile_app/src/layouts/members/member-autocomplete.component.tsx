import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  Autocomplete,
  AutocompleteElement,
  AutocompleteItem,
  Icon,
} from '@ui-kitten/components';
import { AutocompletePropsUser } from './extra/type';
import { addMember, getUsers } from '../../services/classes';
import { UserItem } from './extra/user-item.component';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { err } from 'react-native-svg/lib/typescript/xml';
import { useDispatch } from 'react-redux';
import { loadMembers } from '../../redux/Member/slice';
import Toast from 'react-native-toast-message';

export const MemberAutocomplete = (
  props: AutocompletePropsUser
): AutocompleteElement => {
  const classData: {id: string, name: string} = props.classObj;
  const [value, setValue] = React.useState<string>();
  const [data, setData] = React.useState([]); 
  useEffect(() => { 
    getUsers(value).then(res => {
      setData(res.data.results) 
    })

  }, [value])
  const dispatch = useDispatch();

  const onSelect = (index: number): void => {
     

    addMember({ userId: data[index].id, classId: classData.id }).then(res => {
      if(!res.success) {
        Toast.show({
          type: 'error',
          text1: res.message
        }); 
      }else {
        Toast.show({
          type: 'success',
          text1: res.message
        });
        dispatch(loadMembers({ classId: classData.id , page: 1, searchQuery: ""})) 
        props.navigation.goBack();
      }
     
    }).catch(err => {
      Toast.show({
        type: 'error',
        text1: "Có lỗi xảy ra: Không xác định"
      }); 
    })
  };


  const onChangeText = (query: string): void => { 
    setValue(query); 
  };

  const renderOption = (item, index): React.ReactElement => (
    // <AutocompleteItem key={index} title={item.name} />
    <UserItem key={index} name={item.name} email={item.email} />
  );
  const clearInput = () => {
    setValue(''); 
  }; 
  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name='close'/>
    </TouchableWithoutFeedback>
  );
  return (
    <Autocomplete
      {...props}
      style={styles.autocomplete}
      placeholder='Tìm kiếm theo tên hoặc email'
      value={value}
      onChangeText={onChangeText}
      accessoryRight={renderCloseIcon}
      onSelect={onSelect}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
};

const styles = StyleSheet.create({
  autocomplete: {
    minWidth: 192,
  },
});
