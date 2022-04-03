const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./configs/config")
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const session = require("express-session")
const redis = require("redis");
const RedisStore = require("connect-redis")(session)

let redisClient = redis.createClient({
    legacyMode: true,
    url: `redis://${REDIS_URL}:${REDIS_PORT}`
})

redisClient.connect().catch(console.error);

const app = express();

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log("connected to database"))
    .catch((e) => console.log(e))

const PORT = process.env.PORT || 3000

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000
    }
}))

app.enable("trust proy")
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("<h2>Hello World</h2>")
});

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.listen( PORT, () => {
    console.log("Server is listening on port", PORT)
});