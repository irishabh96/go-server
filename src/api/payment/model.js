import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  paymentResponse: {
    type: Object
  },
  user: {
    type: Schema.ObjectId,
    ref: "User"
  },
  event: {
    type: Schema.ObjectId,
    ref: "Event"
  }
});
const model = mongoose.model("Payment", paymentSchema);

export const schema = model.schema;
export default model;
