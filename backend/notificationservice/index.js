import amqp from 'amqplib';

let channel;
let connection;

export async function start(){
    try {
        connection = await amqp.connect('amqp://rabbitmq');
        channel = await connection.createChannel();

        channel.assertQueue('task_created');
        console.log("Notification service is listening to message");

        channel.consume('task_created', (msg) => {
            const taskData = JSON.parse(msg.content.toString());
            console.log("Receive task data:", taskData);
            channel.ack(msg);
        })
        
    } catch (error) {
       console.log("Error connecting to RabbitMQ:", error.message);
       process.exit(1);
    }
}

start();