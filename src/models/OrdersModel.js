const { default: mongoose } = require("mongoose");

const ordersSchema = new mongoose.Schema({
  carts: [
    {
      user_name: {
        type: String,
        required: true,
      },
      user_email: {
        type: String,
        required: true,
      },
      owner_email: {
        type: String,
        required: true,
      },
      product_id: {
        type: String,
        required: true,
      },
      unit_price: {
        type: Number,
        required: true,
      },
      total_price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      isDeliverd: {
        type: Boolean,
      },
      product_image: {
        type: String,
      },
      stock_limit: Number,
      title: String,
    },
  ],
  tranjectionId: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
  },
  isDeliverd: {
    type: Boolean,
    required: true,
  },
  totalProducts: Number,
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default:  Date.now(),
  },
  clientEmail: {
    type: String,
    required: true,
  },
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
