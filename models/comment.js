import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  testimonyId: {
    type: Schema.Types.ObjectId,
    ref: "Testimony",
  },
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: "Anonymous",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
