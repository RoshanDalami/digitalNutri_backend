import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    subscriptionStartDate: {
      type: String,
    },
    subscriptionEndDate: {
      type: String,
    },
    amountPaid: {
      type: Number,
    },
    planDuration: {
      type: Number,
    },
    priceBeforeDiscount: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
    code: {
      type: String,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export { Payment };
