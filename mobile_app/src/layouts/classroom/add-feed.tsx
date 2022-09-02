import React from 'react';
import { FlatList, ImageSourcePropType, ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Card, Icon, Input, List, ListItem, TopNavigation, TopNavigationAction, Spinner, Divider } from '@ui-kitten/components';
import { CloseIcon, SearchIcon } from './extra/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { AttachmentsMenu } from './extra/attachments-menu.component';
import DocumentPicker from 'react-native-document-picker'
import { postClassFeed, uploadFile } from '../../services/classes';
import { AttatchmentItem } from './extra/attatchment-item.component';
import { useDispatch } from 'react-redux';
import { loadFeeds, reloadFeed } from '../../redux/Classroom/slice';
import Toast from 'react-native-toast-message';



export const AddFeedComponent = (props): React.ReactElement => {

    const dispatch = useDispatch();

    const { navigation, route } = props;
    const { classroom } = route.params;
    const [isLoading, setIsloading] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>("");
    const [content, setContent] = React.useState<string>("");
    const [attatchments, setAttatchments] = React.useState<{ filename: string, size: number }[]>([]);

    const renderBackAction = (): React.ReactElement => (
        <TopNavigationAction
            icon={CloseIcon}
            onPress={navigation.goBack}
        />
    );
    
    const postFeed = async () => { 
        const data = {
            classId: classroom.id,
            content,
            attatchments,
            title
        }
        const res = await postClassFeed(data);
        if(!res.status) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi khi đăng bài!',
                text2: res.message
              }); 
        }else { 
            dispatch(loadFeeds({ classId: classroom.id, page: 1, searchQuery: ""})) 
            Toast.show({
                type: 'success',
                text1: 'Bài viết đã được chia sẻ thành công'
              }); 
            navigation.goBack(); 
        } 
    }

    const renderRightAction = (): React.ReactElement => (
        <Button
            style={styles.footerControl}
            disabled={title == ""}
            onPress={postFeed}
            size='small'>
            Chia sẻ ngay
        </Button>
    );

    const [attachmentsMenuVisible, setAttachmentsMenuVisible] = React.useState<boolean>(false);


    const renderTitleIcon = (props) => (
        <Icon {...props} name={'menu-2-outline'} />
    );
    const renderAttachmentIcon = (props) => (
        <Icon {...props} name={'attach-2-outline'} />
    );


    const toggleAttachmentsMenu = (): void => {
        setAttachmentsMenuVisible(!attachmentsMenuVisible);
    };

    const pickPhotoUpload = async () => {
       
        const results = await DocumentPicker.pickMultiple({
            type: [DocumentPicker.types.images, DocumentPicker.types.video],
        })
        setAttachmentsMenuVisible(false);
        const res: any = await doUpload(results);
        setAttatchments(attatchments.concat(res.data)) 
    }

    const pickFileUpload = async () => {
        const results = await DocumentPicker.pickMultiple({
            type: [DocumentPicker.types.allFiles],
        })
        setAttachmentsMenuVisible(false);
        const res: any = await doUpload(results);
        setAttatchments(attatchments.concat(res.data))
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
            setIsloading(true);
            const result = await uploadFile(data);
            setIsloading(false);
            return result;
        }
    }
    const renderAttachmentsMenu = (): React.ReactElement => (
        <View style={styles.attachmentsMenu}>
            <AttachmentsMenu
                onSelectPhoto={pickPhotoUpload}
                onSelectFile={pickFileUpload}
                onSelectLocation={toggleAttachmentsMenu}
                onSelectContact={toggleAttachmentsMenu}
                onAttachmentSelect={toggleAttachmentsMenu}
                onCameraPress={toggleAttachmentsMenu}
                onDismiss={toggleAttachmentsMenu}
            />
        </View>
    );

    const renderAttatchmentItem = ({ item }) => (
        <AttatchmentItem
            {...item}
            onDeleteAttatchment={removeAttatchment}
        />
    );

    const removeAttatchment = (filename: string) => {
        // console.log("filename cần xoá", filename)
        const updatedFileLists = attatchments.filter(file => {
            return file.filename != filename
        })
        setAttatchments(updatedFileLists);
    }

    return (
        <SafeAreaLayout
            style={styles.container}
            insets='top'>

            <TopNavigation 
                alignment="center"
                accessoryLeft={renderBackAction}
                accessoryRight={renderRightAction}
            />
            <ScrollView style={styles.container}>

                <Input onChangeText={setTitle} style={styles.inputFeed} placeholder='Tiêu đề' accessoryLeft={renderTitleIcon} />
                <Input
                    style={styles.inputFeed}
                    multiline={true}
                    textStyle={{ minHeight: 60 }}
                    placeholder='Nội dung'
                    onChangeText={setContent}
                />
                <Button onPress={toggleAttachmentsMenu} style={styles.button} appearance='ghost' accessoryLeft={renderAttachmentIcon}>
                    Thêm tệp đính kèm
                </Button>
                {isLoading && <View style={styles.loadingFeeds}>
                    <Spinner size='large' />
                </View>}
                <Divider />
                <List
                    style={styles.listContainer}
                    data={attatchments}
                    renderItem={renderAttatchmentItem}
                />
            </ScrollView>
            {attachmentsMenuVisible && renderAttachmentsMenu()}

        </SafeAreaLayout >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flex: 1
    },
    addButton: {
        borderRadius: 100
    },
    inputSearch: {
        padding: 10
    },
    inputFeed: {
        margin: 5
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        margin: 5
    },
    share: {
        padding: 20,
    },
    attachmentsMenu: {
        position: 'absolute',
        bottom: 0,
        width: "100%"
    },
    loadingFeeds: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
