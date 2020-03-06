/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const CONFIG = require('./CONFIG/CONFIG');

// route handlers
const corsHandler = require('./routeHandlers/corsHandler');
const jwtHandler = require('./routeHandlers/jwtHandler');

const rootHandler = require('./routeHandlers/root/rootHandler');

const userSignupHandler = require('./routeHandlers/user/signupHandler');
const userSigninHandler = require('./routeHandlers/user/signinHandler');
const userPasswordchangeHandler = require('./routeHandlers/user/passwordchangeHandler');
const userWithdrawalHandler = require('./routeHandlers/user/withdrawalHandler');
// const userShowHandler = require('./routeHandlers/user/showHandler');
const userAuthenticationHandler = require('./routeHandlers/user/authenticationHandler');

// const blogTextFileHandler = require('./routeHandlers/blog/textFileHandler');
// const blogOriginImageHandler1 = require('./routeHandlers/blog/origin/imageHandler1');
// const blogOriginImageHandler2 = require('./routeHandlers/blog/origin/imageHandler2');
const blogOriginImageHandler = require('./routeHandlers/blog/origin/imageHandler');

const naHandler = require('./routeHandlers/na/naHandler');

//
const app = express();

app.use(morgan('combined'));

app.use(express.json());

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(CONFIG.DATABASE.url, { useNewUrlParser: true });

app.use(express.static('storage'));

app.use(corsHandler);
// routes
app.get('/', rootHandler);

app.post('/user/signup', userSignupHandler);
app.post('/user/signin', userSigninHandler);
app.patch('/user/passwordchange', jwtHandler, userPasswordchangeHandler);
app.delete('/user/withdrawal', jwtHandler, userWithdrawalHandler);
// app.post('/user/show', userShowHandler);
app.post('/user/authentication', jwtHandler, userAuthenticationHandler);

// app.post('/blog/origin/text', jwtHandler, blogTextFileHandler, blogOriginHandler);
// app.post('/blog/origin/image', jwtHandler, blogOriginImageHandler1, blogOriginImageHandler2);
app.post('/blog/origin/image', jwtHandler, blogOriginImageHandler);

app.use(naHandler);

//
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    message: error.message,
  });
});

const server = http.createServer(app);
server.listen(CONFIG.SERVER.port);

module.exports.app = app;
module.exports.server = server;
