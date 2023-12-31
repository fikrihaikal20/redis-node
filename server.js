const express = require('express');
const redis = require('redis');
const PORT = 5001;
const app = express();
const router = express.Router();

app.use(express.json());
app.use(router);

(async () => {

    try {
        const redisClient = redis.createClient({
            url: 'redis://127.0.0.1:6379'
        });
        
        
        redisClient.on('error', (err) => {
            console.log('Error occured while connecting or accessing redis server');
        });
        
        await redisClient.connect();
        
        console.log(redisClient.isOpen)
        
        
        await redisClient.set('foo', 'bar');
        const value = await redisClient.get('foo');
        console.log(value);
    } catch (error) {
        console.log("ini error", error)
    }
})();



router.get('/', (req, res) => {
    res.status(200).json({
        message: "Sample Docker Redis Application"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});