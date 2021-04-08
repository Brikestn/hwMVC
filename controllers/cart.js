const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Cart= require('../models/carts');
const Product = require('../models/products');
const ObjectId = mongodb.ObjectId;



exports.index = (req, res, next) => {
    res.render('index', {
        pageTitle: '',
    });
}

exports.shopPage = (req, res, next) => {
    res.render('products/shop', {
        pageTitle: '',
    });
}
exports.insert = (req, res, next) => {
    res.render('products/insert', {
        pageTitle: '',
    });
}






exports.getCart = (req, res, next) => {

    Cart.fetchAll()
        .then(carts => {
            res.render('products/cart', {
                pageTitle: 'Cart',
                prods: carts,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

// exports.getSearchProduct = (req, res, next) => {

//     Product.fetchAll()
//         .then(products => {
//             res.render('products/search', {
//                 pageTitle: 'Search Product',
//                 prods: products,
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }


exports.postAddCart = (req, res, next) => {
    console.log(req.body);
    const {product_id,product_name, description, price, amount, img_path, category} = req.body;
    const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     res.render('', {
    //         pageTitle: 'Add Cart',
    //         errorMessage: errors.array(),
    //         product_name: product_name,
    //         price: price,
    //     });
    // }
    // const product = new Product(product_name, description, price, amount-1, img_path, category, new ObjectId(product_id));
    // product
    //     .save()
    const cart = new Cart(product_name,price,img_path);
    cart
        .save()
        .then(result => {
            console.log(result);
            console.log('Add Cart');
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getDeleteCart = (req, res, next) => {
    const { cart_id } = req.params;
    console.log(cart_id);
    Cart.deleteById(cart_id)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};
