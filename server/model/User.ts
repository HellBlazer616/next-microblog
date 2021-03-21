/* eslint-disable */
/* prettier-ignore */
// @ts-ignore aldka;ldka dklajd a
import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose"
import { Post } from "./Post";

@modelOptions({ options: { customName: 'User' },  schemaOptions: {
  toObject: {virtuals: true}
 } })
class User {
  @prop({required: true})
   public uid!: string

  @prop({required: true})
   public name!: string

  @prop({ref: () => User })
   public posts?: Ref<Post> 
}

const UserModel = getModelForClass(User);
export { UserModel, User }