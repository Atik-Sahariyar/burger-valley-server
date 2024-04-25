const Orders = require("../models/OrdersModel");
const Product = require("../models/ProductModel");
const Users = require("../models/UserModel");

// get my orders by email
exports.getMyOrders = async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { clientEmail: email };
    const orders = await Orders.find(filter).sort({ orderDate: -1 });
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

    const sellerproducts = products.filter(
      (product) => product.owner_email === ownerEmail
    );

    res.send(sellerproducts);
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get total orders
exports.getTotalProductsOrder = async (req, res) => {
  try {
    const orders = await Orders.find();

    let totalProductsOrders = 0;
    orders.forEach((order) => {
      order.carts.forEach((cartItem) => {
        totalProductsOrders += cartItem.quantity;
      });
    });

    res.status(200).json({ totalProductsOrders });
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get total sales
exports.getTotalProductsSold = async (req, res) => {
  try {
    const orders = await Orders.find();

    let totalProductsSold = 0;
    orders.forEach((order) => {
      if (order?.isDeliverd) {
        order.carts.forEach((cartItem) => {
          totalProductsSold += cartItem.quantity;
        });
      }
    });

    res.status(200).json({ totalProductsSold });
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get total revenue
exports.getTotalRevenue = async (req, res) => {
  try {
    const orders = await Orders.find();

    let totalRevenue = 0;
    orders.forEach((order) => {
      totalRevenue += order?.totalPrice;
    });

    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("Error getting my orders data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get Customers
exports.getCustomers = async (req, res) => {
  try {
    const orders = await Orders.find();

    let customers = [];
    orders.forEach( async(order) => {
      const email = order?.clientEmail;
      const customer = await Users.findOne({email: email});
      customer.push(customer)
    });

    res.status(200).json({ customers });
  } catch (error) {
    console.error("Error getting  customers data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get recent 10 orders
exports.getRecentTenOrder = async (req, res) => {
  try {
    const recentOrders = await Orders.find()
      .sort({ orderDate: -1 }) // Sort by orderDate in descending order
      .limit(10); // Limit the result to 10 entries
    res.status(200).json({ recentOrders });
  } catch (error) {
    console.error("Error getting recent orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// get today's sales and orders
exports.getTodaysSalesAndOrders = async (req, res) => {
  try {
    // Get the start and end of today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Set time to midnight
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // Set time to end of the day

    // Find orders placed today
    const todayOrders = await Orders.find({
      orderDate: { $gte: todayStart, $lt: todayEnd }
    });

    // Calculate total sales for today
    const totalSales = todayOrders.reduce((total, order) => {
      return total + order.totalPrice;
    }, 0);

    res.status(200).json({ totalOrders: todayOrders.length, totalSales });
  } catch (error) {
    console.error("Error getting today's sales and orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

