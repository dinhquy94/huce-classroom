import { ImageSourcePropType } from 'react-native';

export class Article {

  constructor(readonly title: string, 
              readonly content: string,
              readonly images: ImageSourcePropType,
              readonly date: string,
              readonly userId: Profile,
              // readonly likes: Like[],
              // readonly comments: Comment[]
            ) {
  } 
}

export class Like {

  constructor(readonly author: Profile) {

  }
 
}

export class Comment {

  constructor(readonly text: string,
              readonly date: string,
              readonly author: Profile,
              readonly comments: Comment[],
              readonly likes: Like[]) {
  }

  static byHubertFranck(): Comment {
    return new Comment(
      'This very useful information for me Thanks for your article!',
      'Today 11:10 am',
      Profile.hubertFranck(),
      [
        Comment.byMarkVolter(),
      ],
      [
        Like.byMarkVolter(),
      ],
    );
  }
 
}

export class Profile {

  constructor(readonly firstName: string,
              readonly lastName: string,
              readonly photo: ImageSourcePropType) {
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
 
}

