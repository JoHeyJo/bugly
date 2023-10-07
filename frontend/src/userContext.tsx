import { Dispatch, SetStateAction, createContext } from 'react';
import { IUser, IProject } from './interface';
import { infoGet } from './api';

export type UserContextType = {
  user: IUser | null;
  token: string | null;
}

export const UserContext = createContext<UserContextType>({
  user: { id: 0, firstName: '', lastName: '', image: '', email: '' },
  token: ''
})

export type ProjectContextType = {
  projectId: number | undefined;
  projectName: string | undefined;
  fetchProjectPosts: () => void ;
  setProjects: Dispatch<SetStateAction<IProject[]>>;
  getProject: () => void;
  infoGet: (projectId: number) => any;
}

export const ProjectContext = createContext<ProjectContextType>({
  projectId: undefined,
  projectName: undefined,
  fetchProjectPosts: () => { },
  setProjects: () => { },
  getProject: () => { },
  infoGet: async (projectId: number) => {},
});


export type PostContextType = {
  fetchEditPost: ((userId: number) => void) | undefined ;
  number?: number;
  setIsPostRendering: Dispatch<SetStateAction<boolean>>
};

export const PostContext = createContext<PostContextType>({
  fetchEditPost: () => { },
  number: undefined,
  setIsPostRendering: () => { },
});
