const userRouter = require('./userRouter');
const dataRouter = require('./dataRouter');
const publicRouter = require('./publicRouter');

function route(app) {
    app.use('/user',userRouter);
    app.use('/data',dataRouter);
    app.use('/',publicRouter);
}

module.exports = route;
