const Client = require('../models/clientModel');
const Notification = require('../models/notificationModel'); // Assume this model exists
const JWT = require('jsonwebtoken');
const hash = require('../utils/hash');
const AppError = require('../errors/index');


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '$a!yam@2024';

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is missing');
}

class ClientService {
  static generateClientToken(payload) {
    return JWT.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
  }

  static async getClients(search) {
    const { name: searchTerm } = { name: search }; // Destructure for clarity
    console.log('Getting clients');
    console.log({ searchTerm });
    try {
      const query = searchTerm ? { name: new RegExp(searchTerm, 'i') } : {};
      const clients = await Client.find(query).populate('userId', 'name email');
      return { data: clients, token: ClientService.generateClientToken({ data: clients.map(c => c._id) }) };
    } catch (err) {
      throw new AppError('Failed to fetch clients', 500);
    }
  }

  static async getClientById(id) {
    console.log('Getting client by ID');
    console.log({ id });
    try {
      const client = await Client.findById(id).populate('userId', 'name email');
      if (!client) throw new AppError('Client not found', 404);
      return { data: client, token: ClientService.generateClientToken({ data: client._id }) };
    } catch (err) {
      throw new AppError('Failed to fetch client', 500);
    }
  }

  static async createClient(data) {
    const { name, email, phone, cases, documents, lastContact, billingStatus, totalBilled, preferredContact, avatar, company, userId } = data;
    console.log('Creating client');
    console.log(data);
    try {
      const client = new Client({
        name,
        email,
        phone,
        cases,
        documents,
        lastContact,
        billingStatus,
        totalBilled,
        preferredContact,
        avatar,
        company,
        userId
      });
      const savedClient = await client.save();
      return { data: savedClient, token: ClientService.generateClientToken({ data: savedClient._id }) };
    } catch (err) {
      if (err.code === 11000) {
        throw new AppError('Email already exists', 400);
      }
      throw new AppError('Failed to create client', 500);
    }
  }

  static async updateClient(id, updates) {
    console.log('Updating client');
    console.log({ id, updates });
    try {
      const client = await Client.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!client) throw new AppError('Client not found', 404);
      return { data: client, token: ClientService.generateClientToken({ data: client._id }) };
    } catch (err) {
      throw new AppError('Failed to update client', 400);
    }
  }

  static async deleteClient(id) {
    console.log('Deleting client');
    console.log({ id });
    try {
      const client = await Client.findByIdAndDelete(id);
      if (!client) throw new AppError('Client not found', 404);
      return { data: { id }, token: ClientService.generateClientToken({ data: id }) };
    } catch (err) {
      throw new AppError('Failed to delete client', 500);
    }
  }

  static async sendUpdate(id, text) {
    console.log('Sending update');
    console.log({ id, text });
    try {
      const client = await Client.findById(id);
      if (!client) throw new AppError('Client not found', 404);

      const notification = new Notification({
        userId: client.userId,
        text,
        type: 'update',
        read: false,
        createdAt: new Date()
      });
      await notification.save();

      // Placeholder for Nodemailer/Twilio integration (per page 8)
      const notificationToken = ClientService.generateClientToken({ id: client._id, text });
      console.log(`Notification sent to ${client.preferredContact} for client ${client.name}: ${text} (Token: ${notificationToken})`);
      return { data: client, token: notificationToken };
    } catch (err) {
      throw new AppError('Failed to send notification', 400);
    }
  }
}

module.exports = ClientService;