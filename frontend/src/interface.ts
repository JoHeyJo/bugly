export interface IUser {
  id:number;
  firstName: string | undefined;
  lastName: string | undefined;
  image: string;
  email: string;
}

export interface IPost {
  title: string | undefined;
  content: string;
  userId: number;
  firstName: string | undefined;
  lastName: string | undefined;
  id: number;
  createdAt: string;
  problem: string;
  solution: string;
  projectId: number;
}

export interface IPostData extends IPost {
  imageUrl: string | null;
}

export interface IUserId {
  userId: number;
}

export interface UserContextType {
  firstName: string;
  lastName: string;
}

export interface IPosts {
  posts: IPost[];
}

export interface IAlert {
  error: string | null;
}

export interface IProject {
  id: number | undefined;
  name:string | undefined;
  description: string | undefined;
  user_id: number | undefined;
}