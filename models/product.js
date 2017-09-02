var mongoose=require('mongoose');

var productSchema=mongoose.Schema({
    name:{
        type: String
    },
    picture:{
        type: String
    },
    price: {
        type: Number
    },
    category:{
        type: String
    },
    description: {
        type: String
    }
});

var Product=module.exports=mongoose.model('Product',productSchema);

module.exports.getProduct=function(callback,limit){
    Product.find(callback).limit(limit);
};

module.exports.getProductById=function(id,callback){
    Product.findById(id,callback);
};

module.exports.addProduct=function(product,callback){
    Product.create(product,callback);
};

module.exports.updateProduct=function(productId,product, options,callback){
    var id={_id:productId};
    var update={
        name: product.name,
        picture: product.picture,
        price: product.price,
        category: product.category,
        description: product.description        
    };
    Product.findOneAndUpdate(id, update, options,callback);
};

module.exports.deleteProduct=function(productId,callback){
    var id={_id:productId};
    Product.remove(id,callback);
};