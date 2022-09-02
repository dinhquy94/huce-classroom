import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Divider, IndexPath, Layout, List, Menu, MenuItem, MenuItemElement } from '@ui-kitten/components';
import { CameraIcon, FileIcon, ImageIcon, PeopleIcon, PinIcon } from './icons';

export interface AttachmentsMenuProps { 
  onSelectPhoto: () => void;
  onSelectFile: () => void;
  onSelectLocation: () => void;
  onSelectContact: () => void;
  onCameraPress: () => void;
  onAttachmentSelect: (index: number) => void;
  onDismiss: () => void;
}

export type AttachmentsMenuElement = React.ReactElement<AttachmentsMenuProps>;

const menu = [
  { title: 'Ảnh hoặc Video', accessory: ImageIcon },
  { title: 'Tập tin', accessory: FileIcon }
];

export const AttachmentsMenu = (props: AttachmentsMenuProps): React.ReactElement => {

  const onAttachmentsMenuItemSelect = (index: IndexPath): void => {
    switch (index.row) {
      case 0: {
        props.onSelectPhoto();
        return;
      }
      case 1: {
        props.onSelectFile();
        return;
      }
    }
  };

  const renderMenuData = (): MenuItemElement => (
    <>
      {menu.map((el, index) => (
        <MenuItem key={index} title={el.title} accessoryLeft={el.accessory} />
      ))}
    </>
  )

  
  return (
    <Layout>
      <Divider style={styles.divider}/> 
      <Menu
        scrollEnabled={false}
        onSelect={onAttachmentsMenuItemSelect}
      >
        {renderMenuData()}
      </Menu>
      <Button
        appearance='ghost'
        size='giant'
        onPress={props.onDismiss}>
        HUỶ BỎ
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginBottom: 24,
  }, 
  attachmentsContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginBottom: 8,
    maxHeight: 72,
    backgroundColor: 'transparent',
  },
  attachmentsAction: {
    aspectRatio: 1.0,
    height: '100%',
    marginHorizontal: 8,
  },
  attachmentItem: {
    width: 72,
    height: 72,
    marginHorizontal: 8,
    borderRadius: 4,
  },
});
