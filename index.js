var express=require('express');
var app=express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var hbs = require('express-handlebars')

app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.get('/api/login', (req, res) => {
res.render('login')
})
app.get('/api', (req, res) =>{
  res.render('product')
})

config = require('./config');
Product=require('./models/product');
userController = require('./controllers/user');

auth = require('./middlewares/auth');

mongoose.connect(config.db);
var db=mongoose.Connection;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/',function(req,res)
{
   res.send('My products');
});

app.get('/api/product', auth, function(req, res)
{

    Product.getProduct(function(err,product)
    {
        if (err){
            console.log("Errorr");
        }
        res.json(product);
    });
});



app.get('/api/product/:productId', function(req, res)
{
    var productId=req.params.productId;
    Product.getProductById(productId,function(err,product)
    {
        if (err){
            console.log("Errorr");
        }
        res.json(product);
    });
});

app.post('/api/product', auth, function (req, res)
{
//    console.log(req.body);
//    res.status(200).send({message:'El producto se ha recibido'});

//    console.log('POST /api/product');
//    console.log(req.body);
    var product=req.body;

    Product.addProduct(product, function (err, product)
    {
        if (err)
        {
            throw err;
        }
        res.json(product);
    });
});

app.put('/api/product/:productId', auth, function (req, res)
{
    var productId=req.params.productId;
    var product=req.body;

    Product.updateProduct(productId,product,{}, function (err, product)
    {
        if (err)
        {
            throw err;
        }
        res.json(product);
    });
});

app.delete('/api/product/:productId', auth, function(req, res)
{
    var productId=req.params.productId;
    Product.deleteProduct(productId,function(err,product)
    {
        if (err){
            console.log("Errorr");
        }
        res.json(product);
    });
});

app.post('/api/signup',userController.signUp)
app.post('/api/signin', userController.signIn)
app.get('/api/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

//app.listen(3000);
//console.log('Servidor corriendo');
app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
