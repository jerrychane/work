const combineRouter = require('koa-combine-routers');

const aroutes = require('./aRouter');
const broutes = require('./bRouter');

module.exports = combineRouter({
    aroutes,
    broutes
});