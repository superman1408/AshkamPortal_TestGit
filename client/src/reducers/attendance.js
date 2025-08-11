import { ATTEND_ALL, UPDATE, DELETE } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
  switch (action.type) {
    case ATTEND_ALL:
      return action.payload;

    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE:
      return posts.filter((post) => post.id !== action.payload);

    default:
      return posts;
  }
};
