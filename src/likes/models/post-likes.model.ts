import { thinky } from '../likes-thinky/thinky';
import * as uuid from 'uuid'

const type = thinky.type;

const PostLikes = thinky.createModel('PostLikes', {
  id: type.string().default(() => uuid.v4()),
  username: type.string(),
  userId: type.string(),
  postId: type.string(),
  createdAt: type.date().default(() => Date.now())
});

export default PostLikes;
