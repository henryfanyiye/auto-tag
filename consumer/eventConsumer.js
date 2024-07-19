import {Kafka} from 'kafkajs';
import {Logger} from '../libs/logger.js';
import {tagFollow} from '../controller/tagFollow.js';

// Consumer
const kafka = new Kafka({
    brokers: process.env.KAFKA_SERVERS.split(',')
});

const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID
});

await consumer.connect();
await consumer.subscribe({
    topics: process.env.KAFKA_CONSUMER_TOPIC.split(',')
});

await consumer.run({
    autoCommit: true,
    eachBatchAutoResolve: true,
    eachBatch: async ({batch: {topic, partition, messages}}) => {
        for (let message of messages) {
            const {offset, value} = message;
            Logger.info({topic, partition, offset, value: value.toString()});
            tagFollow(JSON.parse(value.toJSON()));
        }
    }
});

