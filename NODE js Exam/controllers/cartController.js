const CartModel = require('../models/cartModel');
const ProductModel = require('../models/ProductModel');

const addItemToCart = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const userId = req.user._id; // Assuming the user is authenticated

        let cart = await CartModel.findOne({ userId });

        if (cart) {
            // Check if product already exists in cart
            const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // If it exists, update quantity
                cart.items[itemIndex].qty += qty;
            } else {
                // Else add as a new item
                cart.items.push({ productId, qty });
            }
        } else {
            // If no cart exists for this user, create one
            cart = new CartModel({
                userId,
                items: [{ productId, qty }],
            });
        }

        await cart.save();
        console.log("Item added to cart:", cart); // Log the cart to check if the items are added
        return res.redirect('/cart');
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error adding item to cart");
    }
};


const viewCart = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the user is authenticated
        const cart = await CartModel.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.render('cart', { items: [] });
        }

        return res.render('cart', { items: cart.items });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error fetching cart");
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const userId = req.user._id;

        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].qty = qty;
        } else {
            return res.status(404).send("Item not found in cart");
        }

        await cart.save();
        console.log("Cart item updated");
        return res.redirect('/cart');
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error updating cart item");
    }
};


const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

        await cart.save();
        console.log("Item removed from cart");
        return res.redirect('/cart');
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error removing item from cart");
    }
};


module.exports = {
    addItemToCart,
    viewCart,
    updateCartItem,
    removeCartItem,
};
