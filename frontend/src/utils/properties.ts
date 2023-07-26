type actionProperties = {
  [key: string]: {
    label: string;
    class: string;
    variant: string;
    style: string;
    message: string;
  }
}

export const actionProperties: actionProperties = {
  addPost: {
    label: 'Add Post',
    class: "my-0",
    variant: "outline-warning",
    style: "",
    message: "You need to be logged in to add a Post"
  },
  editPost: {
    label: 'Edit Post',
    class: "my-0",
    variant: "outline-warning",
    style: "marginLeft: 'auto'",
    message: "You need to be logged in to edit a Post"
  },
  addProject: {
    label: 'Add Project',
    class: "my-3",
    variant: "outline-warning",
    style: "",
    message: "You need to be logged in to add a Project"
  },
  deletePost: {
    label: 'Delete Post',
    class: "my-0",
    variant: "outline-danger",
    style: "",
    message: "You need to be logged in to delete a Post"
  },
  deleteProject: {
    label: 'Delete Project',
    class: "my-0",
    variant: "outline-danger",
    style: "",
    message: "You need to be logged in to delete a Project"
  }
}