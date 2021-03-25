export interface User {
  _id: string;
  uid: string;
  name: string;
}

export interface Comment {
  _id: string;
  author: User;
  authorId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  authorId: string;
  text: string;
  comments?: Comment[];
  likedByUsersId?: string[];
  likedByUsers?: User[];
  disLikedByUsersId?: string[];
  disLikedByUsers?: User[];
  createdAt: string;
  updatedAt: string;
  author: User;
}
