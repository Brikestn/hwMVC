const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Carts {
    constructor(product_name,price,img_path) {
        this.product_name = product_name;
        this.price = price;
        this.img_path = img_path;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('cart')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product
            dbOp = db.collection('cart').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('cart')
            .find()
            .toArray()
            .then(carts => {
                console.log(carts);
                return carts;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('cart')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(cart => {
                console.log(cart);
                return cart;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('cart')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
    

    // static fetchAllByCategory(category) {
    //     const db = getDb();
    //     console.log(category);
    //     return db
    //         .collection('products')
    //         .find({ category: category })
    //         .toArray()
    //         .then(products => {
    //             console.log(products);
    //             return products;
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }


    // static findByCategory(category) {
    //     const db = getDb();
    //     return db
    //         .collection('products')
    //         .find({ category: category })
    //         .next()
    //         .then(product => {
    //             console.log(product);
    //             return product;
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }
}

module.exports = Carts;