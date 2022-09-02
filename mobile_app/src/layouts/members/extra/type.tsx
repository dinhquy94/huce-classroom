export interface UserProps {
    id: number;
    name: string;
    email: string;
};


export interface AutocompletePropsUser  {
    data?: UserProps[];
    classObj: { name: string, id: string, owner: string },
    navigation: any
  }