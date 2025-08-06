import amqp from "amqplib";

export let channel;
export let connection;

export async function connectRabbitMQwithRetry(retries = 5, delay = 3000) {
  while (retries) {
    try {
      connection = await amqp.connect("amqp://rabbitmq");
      channel = await connection.createChannel();

      await channel.assertQueue("task_created");
      console.log("Connected to RabbitMQ");
      return { connection, channel };
    } catch (error) {
      console.log("Error connecting to RabbitMQ:", error.message);
      retries--;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}