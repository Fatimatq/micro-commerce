const express = require("express");
const {createProxyMiddleware} = require("http-proxy-middleware");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
const {
    ORDER_API_URL = "http://localhost:5001",
    PRODUCT_API_URL = "http://localhost:5000",
    PAYMENT_API_URL = "http://localhost:5002",
    AUTHENTIFICATION_API_URL = "http://localhost:5004"
} = process.env;
const createProxyOptions = (target) => ({
    target,
    changeOrigin: true,
    logLevel: 'debug',
    onError: (err, req, res) => {
        console.error(err);
        res.status(500).json({
            error: 'Proxy Error',
            message: err.message,
        });
    },
});
const optionsProducts = createProxyOptions(PRODUCT_API_URL);
const optionsOrders= createProxyOptions(ORDER_API_URL);
const optionsPayment = createProxyOptions(PAYMENT_API_URL);
const optionsAuthentification = createProxyOptions(AUTHENTIFICATION_API_URL);

const productsProxy = createProxyMiddleware(optionsProducts);
const ordersProxy = createProxyMiddleware(optionsOrders);
const paymentsProxy = createProxyMiddleware(optionsPayment);
const authentificationProxy = createProxyMiddleware(optionsAuthentification);

app.get("/", (req, res) => res.send("API Getway..!!"));
app.all("/Orders", ordersProxy);
app.all("/Payments", paymentsProxy);
app.all("/Products", productsProxy);
app.get("/Products/:productId", productsProxy);
app.all("/Orders/:orderId", ordersProxy);
app.all('/users/register', authentificationProxy);
app.all('/users/login', authentificationProxy);
app.all('/users/:id', authentificationProxy);
app.all('/users/logout', authentificationProxy);

app.listen(port, () => console.log(`API Gateway listening on port ${port}`));
