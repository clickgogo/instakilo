import { thinky } from '../likes-thinky/thinky';
import * as uuid from 'uuid'

const type = thinky.type;

const CommentLikes = thinky.createModel('CommentLikes', {
  id: type.string().default(() => uuid.v4()),
  username: type.string(),
  userId: type.string(),
  CommentId: type.string(),
  createdAt: type.date().default(() => Date.now())
});

export default CommentLikes;
