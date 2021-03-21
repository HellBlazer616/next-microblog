import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose"
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import {User} from './User'

@modelOptions({ options: { customName: 'Comment' }, schemaOptions: {
  toObject: {virtuals: true}
} 
})
class Comment extends TimeStamps {
  @prop({ref: () => User, required: true, localField: 'authorId', foreignField: 'uid', justOne: true})
  public author!: Ref<User>

  @prop({required: true})
  public authorId!: string

 @prop({required: true})
  public text!: string

 @prop({required: true, default: Date.now})
  public createdAt!: Date

 @prop({required: true, default: Date.now})
  public updatedAt!: Date
}

const CommentModel = getModelForClass(Comment);
export {CommentModel, Comment}