const initialState = [];

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_POST":
      return [
        ...state,
        {
          id: action.payload.id,
          userID: action.payload.userID,
          username: action.payload.username,
          content: action.payload.content,
          title: action.payload.title,
          type: action.payload.type,
          usersLiked: action.payload.usersLiked,
        },
      ];
    default:
      return state;
  }
};

export default posts;
