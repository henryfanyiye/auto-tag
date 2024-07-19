import {Kafka} from 'kafkajs'

// Producer
const kafka = new Kafka({
    brokers: process.env.KAFKA_SERVERS.split(',')
})

const producer = kafka.producer()

await producer.connect()

export const produce = async (topic, value, key) => {
    await producer.send({
        topic,
        messages: [{key, value}]
    })
}