import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  MAIL,
  SENDMAILDATA,
  FETCH_POST,
  UPDATE_STATUS,
  TODOLIST
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case FETCH_POST:
      return action.payload;

    case CREATE:
      return [...posts, action.payload];

    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE:
      return posts.filter((post) => post.id !== action.payload);

    case MAIL:
      return [...posts, action.payload];

    case SENDMAILDATA:
      return {
        ...posts,
        posts: posts.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        }),
      };

    case UPDATE_STATUS:
      return {
        ...posts,
        posts: posts.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        }),
      };

    // case TODOLIST:
    // return {
    //   ...posts,
    //   posts: posts.posts.map((post) => {
    //     if (post._id === action.payload._id) return action.payload;
    //     return post;
    //   }),
    // }
    case TODOLIST:
      return [...posts, action.payload];

    default:
      return posts;
  }
};
