const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
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






exports.getSearchShop = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('products/shop', {
                pageTitle: 'Search Product',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getSearchProduct = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('products/search', {
                pageTitle: 'Search Product',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}


exports.getAddProduct = (req, res, next) => {
    const product_name = '';
    const description = '';
    const price = '';
    const amount = '';
    const img_path = '';
    const category = '';
    res.render('insert', {
        pageTitle: 'Insert Product',
        errorMessage: null,
        product_name: product_name,
        description:description,
        price: price,
        amount:amount,
        img_path:img_path,
        category:category,
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const {product_name,description,price,amount,img_path,category} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('insert', {
            pageTitle: 'Insert Product',
            errorMessage: errors.array(),
            product_name: product_name,
            description:description,
            price: price,
            amount:amount,
            img_path:img_path,
            category:category,
        });
    }

    const product = new Product(product_name,description,price,amount,img_path,category);
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/products');
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getUpdateProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let description = '';
    let price = '';
    let amount = '';
    let img_path = '';
    let category = '';

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            product_name = product.product_name;
            description = product.description;
            price = product.price;
            amount = product.amount;
            price = product.price;
            img_path = product.img_path;
            category = product.category;
            res.render('products/update', {
                pageTitle: 'Update Product',
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                description : description,
                price: price,
                amount: amount,
                img_path: img_path,
                category: category
            });
        })
        .catch(err => console.log(err));
};

exports.getDetailProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let description = '';
    let price = '';
    let amount = '';
    let img_path = '';
    let category = '';

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            product_name = product.product_name;
            description = product.description;
            price = product.price;
            amount = product.amount;
            price = product.price;
            img_path = product.img_path;
            category = product.category;
            res.render('products/detail', {
                pageTitle: 'Detail Product',
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                description : description,
                price: price,
                amount: amount,
                img_path: img_path,
                category: category
            });
        })
        .catch(err => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
    console.log(req.body);
    const { product_id, product_name, description, price, amount, img_path, category } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('products/update', {
            pageTitle: 'Update Product',
            errorMessage: errors.array(),
            product_id: product_id,
            product_name: product_name,
            description : description,
            price: price,
            amount: amount,
            img_path: img_path,
            category: category
        });
    }

    const product = new Product(product_name, description, price, amount, img_path, category, new ObjectId(product_id));
    product
        .save()
        .then(result => {
            console.log('Update Product');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
    const { product_id } = req.params;
    console.log(product_id);
    Product.deleteById(product_id)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};

exports.selectCategory = (req, res, next) => {
    const { category } = req.body;
    if (category == "all"){
        Product.fetchAll()
        .then(products => {
            res.render('products/shop', {
                pageTitle: 'Search Product',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
        
    }else{
    Product.fetchAllByCategory(category)
        .then(products => {
            res.render('products/shop', {
                
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
};