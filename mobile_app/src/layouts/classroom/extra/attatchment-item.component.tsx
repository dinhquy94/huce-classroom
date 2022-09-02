
import { Button, Icon, ListItem } from '@ui-kitten/components';
import React from 'react';
import { Alert } from 'react-native';

export type AttatchmentItemProps = {
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number,
    onDeleteAttatchment: (filename: string) => void;
    onDownloadAttatchment: (filename: string) => void;
};




export const AttatchmentItem = (props: AttatchmentItemProps): React.ReactElement => {


    const renderAttachmentIcon = (props: any) => (
        <Icon {...props} name={'attach-2-outline'} />
    );
    
    const renderRemoveIcon = (props: any) => (
        <Button   onPress={removeFile} appearance='ghost' accessoryLeft={RemoveIcon} />
    );
    
    const RemoveIcon = (props: any) => (
        <Icon {...props} name={'trash-2-outline'} />
    )
     
    const removeFile = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có muốn xoá tập tin đính kèm bài đăng ?",
            [
              {
                text: "Huỷ bỏ",
                onPress: () => {},
                style: "cancel"
              },
              { 
                text: "Xoá", onPress: () => { 
                    props.onDeleteAttatchment(props.filename); 
                }
              }
            ]
          ); 
    }
    const downloadAttatchment = () => {
        props.onDownloadAttatchment(props.filename)
    }

    return (<ListItem
        title={props.originalname}
        description={`Kích thước: ${props.size} bytes`}
        accessoryLeft={renderAttachmentIcon}
        accessoryRight={renderRemoveIcon}
        onPress={downloadAttatchment}
    />)
}