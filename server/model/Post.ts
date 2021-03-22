import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose"
import { User } from "./User";
import { Comment } from './Comment';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import * as mongoose from 'mongoose'
@modelOptions({ options: { customName: 'Post' },  schemaOptions: {
  toObject: {virtuals: true}
 }  })
class Post extends TimeStamps {
  
  @prop({required: true})
  public authorId!: string
  
  @prop({required: true})
  public text!: string
  
  @prop({ ref: () => Comment })
  public comments?: Ref<Comment>[];
  
  @prop({type: String})
  public likedByUsersId?: string[]; 
  
  @prop({type: String})
  public disLikedByUsersId?: string[]; 
  
  @prop({required: true, default: Date.now})
  public createdAt!: Date
  
  @prop({required: true, default: Date.now})
  public updatedAt!: Date
  
  //virtual populate
  @prop({ref: () => User, required: true, localField: 'authorId', foreignField: 'uid', justOne: true})
  public author!: Ref<User>

  //virtual populate
  @prop({ref: () => User, required: true, localField: 'likedByUsersId', foreignField: 'uid'})
  public likedByUsers?: Ref<User>[]; 

  //virtual populate
  @prop({ref: () => User, required: true, localField: 'disLikedByUsersId', foreignField: 'uid'})
  public disLikedByUsers?: Ref<User>[]; 
}

const PostModel = getModelForClass(Post);

export {PostModel, Post}