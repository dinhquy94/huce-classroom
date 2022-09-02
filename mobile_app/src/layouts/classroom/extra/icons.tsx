import React from 'react';
import { Icon, IconElement, useTheme } from '@ui-kitten/components';
import { ImageStyle } from 'react-native';

export const MessageCircleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='message-circle'/>
);
export const HeartIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='heart'/>
);

export const AttatchmentIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='attach-outline'/>
);

export const PersonAddIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='person-add'/>
);

export const PinIcon = (): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      width={16}
      height={16}
      fill={theme['text-control-color']}
      name='pin'
    />
  );
};


export const ArrowIosBackIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='arrow-ios-back'/>
);

export const DoneAllIcon = (style: ImageStyle): IconElement => {
  const theme = useTheme();
  return (
    <Icon {...style} width={16} height={16} fill={theme['color-primary-default']} name='done-all'/>
  );
};

export const SearchIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='search'/>
);

export const CloseIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='close-outline'/>
);


export const CameraIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='camera'/>
);

export const FileIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='file'/>
);

export const ImageIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='image'/>
);

export const MicIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='mic'/>
);

export const PaperPlaneIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='paper-plane'/>
);

export const PeopleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='people'/>
);
 

export const PlusIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='plus'/>
);
