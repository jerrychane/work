const combineRouters = require('koa-combine-routers');

const aroutes = require('./aRouter');
const broutes = require('./bRouter');

module.exports = combineRouters(
    aroutes,
    broutes
);