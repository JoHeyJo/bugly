type actionProperties = {
  [key: string]: {
    label: string | undefined;
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
  },
  addDetails: {
    label: 'Add details',
    class: "",
    variant: "outline-warning",
    style: "",
    message: "You need to be logged in to add details"
  },
  addTech: {
    label: "add",
    class: "my-0 mx-0 py-0 px-0",
    variant: "none",
    style: "",
    message: "You need to be logged in to add tech"
  },
  deleteTech: {
    label: undefined,
    class: "my-0 mx-0 py-0 px-0",
    variant: "none",
    style: "",
    message: "log in to delete tech"
  }
}