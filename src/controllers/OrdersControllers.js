const Orders = require("../models/OrdersModel");
const Product = require("../models/ProductModel");

// get my orders by email
exports.getMyOrders = async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { clientEmail: email };
    const orders = await Orders.find(filter).sort({orderDate: -1});
    const myOrders = [];
    let totalSell = 0;

    orders.forEach((order) => {
      totalSell += order?.totalProducts;
      const cartsInOrder = order.carts;
      myOrders.push(...cartsInOrder);
    });

    res.send({ orders, myOrders });
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get seller orders by owner email;

exports.getSellerOrders = async (req, res) => {
  try {
    const ownerEmail = req.params.email;
    const orders = await Orders.find();
    const allCarts = [];

    orders.forEach((order) => {
      const cartsInOrder = order.carts;
      allCarts.push(...cartsInOrder);
    });

    const productPromises = allCarts.map(async (cart) => {
      const id = cart?.product_id;
      const product = (await Product.findById(id)) || {};
      return product;
    });

    const products = await Promise.all(productPromises);

    const sellerproducts = products.filter((product) => product.owner_email === ownerEmail);

    res.send(sellerproducts);
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.getTotalproductsSold = async(req, res) => {
  try{
    const orders = await Orders.find();

    let totalproductsSold = 0;
    orders.forEach((order) => {
      order.carts.forEach((cartItem) => {
        totalproductsSold += cartItem.quantity;
      });
    });

    res.status(200).json({ totalproductsSold });
  }  catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}