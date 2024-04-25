const Wishlists = require("../models/WishlistModel");

// get my all Wishlists by email
exports.getWishlistsController = async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { customer_email: email };
    const Wishlists = await Wishlists.find(filter);
    res.send( Wishlists);

  } catch (error) {
    console.error("Error getting my Wishlists data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get one Wishlists
exports.getOneWishlistController = async (req, res) => {
  try {
    const id = req.params.id;
    const Wishlist = await Wishlists.findById(id);
    res.send(Wishlist);
  } catch (error) {
    console.error("Error getting Wishlist data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// add to Wishlist
exports.postWishlistController = async (req, res) => {
  try {
    const Wishlist = req.body;
    const email = req.params.email;
    const filter = { customer_email: email };
    const Wishlists = await Wishlists.find(filter);
    const existingProduct = Wishlists.find((item) => item.product_id === Wishlist?.product_id);

    if (existingProduct) {
      return res.send({
        message: "This product already exists",
        insertedId: null,
      });
    }
    const newWishlist = new Wishlists(Wishlist);
    const result = await newWishlist.save();
    res.send(result);
  } catch (error) {
    console.error("Error getting Wishlist data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// add to Wishlists
exports.postManywishlistsConroller = async (req, res) => {
  try {
    const email = req.params.email;
    const incomingWishlists = req.body; 

    // Retrieve existing Wishlists for the user
    const filter = { customer_email: email };
    const existingWishlists = await Wishlists.find(filter);

    const insertedIds = [];

    // Iterate over each incoming Wishlist item
    for (const Wishlist of incomingWishlists) {
      // Check if the product already exists in the user's Wishlists
      const existingProduct = existingWishlists.find(item => item.product_id === Wishlist.product_id);

      if (existingProduct) {
        // Product already exists, skip insertion
        continue;
      }

      // Create a new Wishlist object
      const newWishlist = new Wishlists({
        ...Wishlist,
      });

      const result = await newWishlist.save();
      insertedIds.push(result._id); // Store the inserted Wishlist's ID
    }

    res.send({
      message: "Wishlists added successfully",
      insertedIds: insertedIds
    });
  } catch (error) {
    console.error("Error adding Wishlist data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateWishlistController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("update value: ", req.body);
    const result = await Wishlists.findByIdAndUpdate(id, req.body, { new: true });
    res.send(result);
  } catch (error) {
    console.error("Error update Wishlist data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a Wishlist
exports.deleteWishlistController = async (req, res) => {
  try {
    const result = await Wishlists.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    console.error("Error delete Wishlist data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// delete my Wishlists
exports.deleteWishlistsController = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Wishlists.deleteMany({customer_email: email});
    res.send(result);
  } catch (error) {
    console.error("Error delete Wishlist data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


