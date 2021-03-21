import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose"
import { User } from "./User";
import { Comment } from './Comment';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({ options: { customName: 'Post' },  schemaOptions: {
  toObject: {virtuals: true}
 }  })
class Post extends TimeStamps {
  @prop({ref: () => User, required: true, localField: 'authorId', foreignField: 'uid', justOne: true})
  public author!: Ref<User>

 @prop({required: true})
  public authorId!: string

 @prop({required: true})
  public text!: string

  @prop({ ref: 'Comment' })
  public comments?: Ref<Comment>[];

  @prop({ref: () => User, required: true, localField: 'author', foreignField: 'uid'})
  public likedByUsers?: Ref<User>[]; 

  @prop({ref: () => User, required: true, localField: 'author', foreignField: 'uid'})
  public disLikedByUsers?: Ref<User>[]; 

  @prop({required: true, default: Date.now})
  public createdAt!: Date

 @prop({required: true, default: Date.now})
  public updatedAt!: Date
}

const PostModel = getModelForClass(Post);
export {PostModel, Post}