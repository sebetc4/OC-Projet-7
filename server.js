require("dotenv");

const express = require('express');
const cookieParser = require('cookie-parser')
const helmet = require("helmet");

const cors = require('./middleware/cors.middleware')
const errors = require('./middleware/errors.middleware')

const jwtFeatures = require('./config/jwt.config')
const limiter = require('./config/limiter.config')
const helmetConfig = require('./config/helmet.config')

const db = require('./models')

const router = require('./routes')

const { errorHandler, normalizePort, listening } = require('./utils/server')
const app = express();
const http = require("http");
const server = http.createServer(app);

const socketFatures = require('./socket')
const io = require('socket.io')(server)

const port = normalizePort(process.env.PORT || 8080);

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

app.set("port", port);

if (process.env.NODE_ENV === 'production') {
    app.use('/api', limiter)
    app.use(helmet(helmetConfig));
}

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SIGN));
app.use(jwtFeatures)
app.use(cors);
app.use(router)
app.use(errors)

io.on('connection', (socket) => socketFatures(io, socket))

server.on("error", (error) => errorHandler(error, server, port));
server.on("listening", () => listening(server, port))
server.listen(port);
