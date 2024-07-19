'use strict';
import express from 'express';
import {produce} from './libs/kafkaProducer.js';

// Register Kafka Consumer
import './consumer/eventConsumer.js';

const app = express();
const port = process.env.PORT;

setInterval(function () {
    produce('event', 'test', 'test');
}, 1000);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});