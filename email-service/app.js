const express = require("express");
const router = express.Router();
const amqp = require("amqplib");
const axios = require("axios");
const nodemailer = require("nodemailer");
require("express-async-errors");
require("dotenv").config();

const sendEmail = async (mail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false,

      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls:{
        rejectUnauthorized: true
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: mail,
      subject: 'Confirmation de paiement',
      text: 'Votre paiement a été confirmé avec succès!',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès :', info.response);
    return info;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error.message);
    throw error;
  }
};

let channel;

async function connectRabbitMQ() {
  try {
    const amqpServer = process.env.RABBITMQ_URL || "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ORDER");

    channel.consume("ORDER", (data) => {
      try {
        const { email } = JSON.parse(data.content);
        console.log("Consuming ORDER service   " + email);
        sendEmail(email);
        channel.ack(data);
      } catch (error) {
        console.error('Erreur lors de la consommation du message :', error);
      }
    });

    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Erreur lors de la connexion à RabbitMQ :", error);
    process.exit(1);
  }
}

async function start() {
  await connectRabbitMQ();

  const app = express();
  app.use(express.json());

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Email Service at ${port}`);
  });
}

start();