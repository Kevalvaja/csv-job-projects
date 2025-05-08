const Queue = require('bull');
const csvProcessor = require('./processor');
const redisConfig = require('../config/redis');

const csvQueue = new Queue('csvQueue', { redis: redisConfig });

csvQueue.process('csv-processing', csvProcessor);

module.exports = csvQueue;
