// // const { clientValidationSchema } = require('../lib/validators/client.validator');
// // const ClientService = require('../service/clientService');
// // const ClientError = require('../errors/index');
// // const JWT = require('jsonwebtoken');

// // const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '$a!yam@2024';

// // if (!JWT_SECRET_KEY) {
// //   throw new Error('JWT_SECRET_KEY is missing');
// // }

// // async function handleGetClients(req, res) {
// //     const { search } = req.query;
// //     console.log('Fetching clients');
// //     console.log({ search });
// //     const validationResult = await clientValidationSchema.partial().safeParseAsync({ search });
// //     if (validationResult.error) {
// //         return res.status(400).json({ error: validationResult.error });
// //     }

// //     try {
// //         const clients = await ClientService.getClients(search);
// //         const token = JWT.sign({ data: clients }, JWT_SECRET_KEY, { expiresIn: '1h' });
// //         return res.status(200).json({ status: 'success', data: clients, token });
// //     } catch (err) {
// //         if (err instanceof ClientError) {
// //             return res.status(err.code).json({ status: 'error', message: err.message });
// //         }
// //         return res.status(500).json({ status: 'error', error: 'Internal server error' });
// //     }
// // }

// // async function handleGetClientById(req, res) {
// //     const { id } = req.params;
// //     console.log('Fetching client by ID');
// //     console.log({ id });
// //     const validationResult = await clientValidationSchema.partial().safeParseAsync({ id });
// //     if (validationResult.error) {
// //         return res.status(400).json({ error: validationResult.error });
// //     }

// //     try {
// //         const client = await ClientService.getClientById(id);
// //         if (!client) return res.status(404).json({ status: 'error', message: 'Client not found' });
// //         const token = JWT.sign({ data: client }, JWT_SECRET_KEY, { expiresIn: '1h' });
// //         return res.status(200).json({ status: 'success', data: client, token });
// //     } catch (err) {
// //         if (err instanceof ClientError) {
// //             return res.status(err.code).json({ status: 'error', message: err.message });
// //         }
// //         return res.status(500).json({ status: 'error', error: 'Internal server error' });
// //     }
// // }

// // async function handleCreateClient(req, res) {
// //     const body = req.body;
// //     console.log(body);
// //     const validationResult = await clientValidationSchema.safeParseAsync(req.body);
// //     if (validationResult.error) {
// //         return res.status(400).json({ error: validationResult.error });
// //     }

// //     const { name, email, phone, cases, documents, lastContact, billingStatus, totalBilled, preferredContact, avatar, company, userId } = validationResult.data;

// //     try {
// //         const client = await ClientService.createClient({ name, email, phone, cases, documents, lastContact, billingStatus, totalBilled, preferredContact, avatar, company, userId });
// //         const token = JWT.sign({ data: client }, JWT_SECRET_KEY, { expiresIn: '1h' });
// //         return res.status(201).json({ status: 'success', data: client, token });
// //     } catch (err) {
// //         if (err instanceof ClientError) {
// //             return res.status(err.code).json({ status: 'error', message: err.message });
// //         }
// //         return res.status(500).json({ status: 'error', error: 'Internal server error' });
// //     }
// // }

// // async function handleUpdateClient(req, res) {
// //     const { id } = req.params;
// //     const body = req.body;
// //     console.log('Updating client');
// //     console.log({ id, body });
// //     const validationResult = await clientValidationSchema.partial().safeParseAsync({ ...body, id });
// //     if (validationResult.error) {
// //         return res.status(400).json({ error: validationResult.error });
// //     }

// //     try {
// //         const client = await ClientService.updateClient(id, body);
// //         if (!client) return res.status(404).json({ status: 'error', message: 'Client not found' });
// //         const token = JWT.sign({ data: client }, JWT_SECRET_KEY, { expiresIn: '1h' });
// //         return res.status(200).json({ status: 'success', data: client, token });
// //     } catch (err) {
// //         if (err instanceof ClientError) {
// //             return res.status(err.code).json({ status: 'error', message: err.message });
// //         }
// //         return res.status(500).json({ status: 'error', error: 'Internal server error' });
// //     }
// // }

// // async function handleDeleteClient(req, res) {
// //     const { id } = req.params;
// //     console.log('Deleting client');
// //     console.log({ id });
// //     const validationResult = await clientValidationSchema.partial().safeParseAsync({ id });
// //     if (validationResult.error) {
// //         return res.status(400).json({ error: validationResult.error });
// //     }

// //     try {
// //         const result = await ClientService.deleteClient(id);
// //         if (!result) return res.status(404).json({ status: 'error', message: 'Client not found' });
// //         const token = JWT.sign({ data: { id } }, JWT_SECRET_KEY, { expiresIn: '1h' });
// //         return res.status(200).json({ status: 'success', message: 'Client deleted', token });
// //     } catch (err) {
// //         if (err instanceof ClientError) {
// //             return res.status(err.code).json({ status: 'error', message: err.message });
// //         }
// //         return res.status(500).json({ status: 'error', error: 'Internal server error' });
// //     }
// // }

// // async function handleSendUpdate(req, res) {
// //     const { id } = req.params;
// //     const { text } = req.body;
// //     console.log('Sending update');
// //     console.log({ id, text });
// //     const validationResult = await clientValidationSchema.partial().safeParseAsync({ id, text });
// //     if (validationResult.error) {
// //         return res.status(400).json({ error: validationResult.error });
// //     }

// //     try {
// //         const result = await ClientService.sendUpdate(id, text);
// //         if (!result) return res.status(404).json({ status: 'error', message: 'Client not found' });
// //         const token = JWT.sign({ data: { id, text } }, JWT_SECRET_KEY, { expiresIn: '1h' });
// //         return res.status(200).json({ status: 'success', message: 'Notification sent', token });
// //     } catch (err) {
// //         if (err instanceof ClientError) {
// //             return res.status(err.code).json({ status: 'error', message: err.message });
// //         }
// //         return res.status(500).json({ status: 'error', error: 'Internal server error' });
// //     }
// // }

// // module.exports = { handleGetClients, handleGetClientById, handleCreateClient, handleUpdateClient, handleDeleteClient, handleSendUpdate };




// const { clientValidationSchema } = require('../lib/validators/client.validator');
// const ClientService = require('../service/clientService');
// const ClientError = require('../errors/index');
// const JWT = require('jsonwebtoken');

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '$a!yam@2024';

// if (!JWT_SECRET_KEY) {
//   throw new Error('JWT_SECRET_KEY is missing. Please set it in environment variables.');
// }

// async function handleGetClients(req, res) {
//   const { search } = req.query;
//   console.log(search);
//   console.log('Fetching clients');
//   console.log({ search: search || 'none' });

//   // Allow undefined or empty search term
//   const validationResult = await clientValidationSchema.partial().safeParseAsync({ search });
//   if (validationResult.error) {
//     return res.status(400).json({ status: 'error', message: 'Invalid search parameter', details: validationResult.error });
//   }

//   try {
//     const clientsResponse = await ClientService.getClients(search);
//     // Wrap clients in a nested object to match frontend expectation
//     const token = JWT.sign({ clientIds: clientsResponse.data.clients.map(c => c._id) }, JWT_SECRET_KEY, { expiresIn: '1h' });
//     return res.status(200).json({ status: 'success', data: clientsResponse.data, token });
//   } catch (err) {
//     if (err instanceof ClientError) {
//       console.error(`ClientError: ${err.message}`, { code: err.code });
//       return res.status(err.code || 400).json({ status: 'error', message: err.message });
//     }
//     console.error('Internal server error:', err);
//     return res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// }

// async function handleGetClientById(req, res) {
//   const { id } = req.params;
//   console.log('Fetching client by ID');
//   console.log({ id });

//   const validationResult = await clientValidationSchema.partial().safeParseAsync({ id });
//   if (validationResult.error) {
//     return res.status(400).json({ status: 'error', message: 'Invalid client ID', details: validationResult.error });
//   }

//   try {
//     const clientResponse = await ClientService.getClientById(id);
//     if (!clientResponse.data) {
//       return res.status(404).json({ status: 'error', message: 'Client not found' });
//     }
//     const token = JWT.sign({ clientId: clientResponse.data._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
//     return res.status(200).json({ status: 'success', data: clientResponse.data, token });
//   } catch (err) {
//     if (err instanceof ClientError) {
//       console.error(`ClientError: ${err.message}`, { code: err.code });
//       return res.status(err.code || 400).json({ status: 'error', message: err.message });
//     }
//     console.error('Internal server error:', err);
//     return res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// }

// async function handleCreateClient(req, res) {
//   const body = req.body;
//   console.log('Creating client');
//   console.log(body);

//   const validationResult = await clientValidationSchema.safeParseAsync(body);
//   if (validationResult.error) {
//     return res.status(400).json({ status: 'error', message: 'Invalid client data', details: validationResult.error });
//   }

//   const { name, email, phone, cases, documents, lastContact, billingStatus, totalBilled, preferredContact, avatar, company, userId } = validationResult.data;

//   try {
//     const clientResponse = await ClientService.createClient({
//       name,
//       email,
//       phone,
//       cases,
//       documents,
//       lastContact,
//       billingStatus,
//       totalBilled,
//       preferredContact,
//       avatar,
//       company,
//       userId,
//     });
//     const token = JWT.sign({ clientId: clientResponse.data._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
//     return res.status(201).json({ status: 'success', data: clientResponse.data, token });
//   } catch (err) {
//     if (err instanceof ClientError) {
//       console.error(`ClientError: ${err.message}`, { code: err.code });
//       return res.status(err.code || 400).json({ status: 'error', message: err.message });
//     }
//     console.error('Internal server error:', err);
//     return res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// }

// async function handleUpdateClient(req, res) {
//   const { id } = req.params;
//   const body = req.body;
//   console.log('Updating client');
//   console.log({ id, body });

//   const validationResult = await clientValidationSchema.partial().safeParseAsync({ ...body, id });
//   if (validationResult.error) {
//     return res.status(400).json({ status: 'error', message: 'Invalid update data', details: validationResult.error });
//   }

//   try {
//     const clientResponse = await ClientService.updateClient(id, body);
//     if (!clientResponse.data) {
//       return res.status(404).json({ status: 'error', message: 'Client not found' });
//     }
//     const token = JWT.sign({ clientId: clientResponse.data._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
//     return res.status(200).json({ status: 'success', data: clientResponse.data, token });
//   } catch (err) {
//     if (err instanceof ClientError) {
//       console.error(`ClientError: ${err.message}`, { code: err.code });
//       return res.status(err.code || 400).json({ status: 'error', message: err.message });
//     }
//     console.error('Internal server error:', err);
//     return res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// }

// async function handleDeleteClient(req, res) {
//   const { id } = req.params;
//   console.log('Deleting client');
//   console.log({ id });

//   const validationResult = await clientValidationSchema.partial().safeParseAsync({ id });
//   if (validationResult.error) {
//     return res.status(400).json({ status: 'error', message: 'Invalid client ID', details: validationResult.error });
//   }

//   try {
//     const result = await ClientService.deleteClient(id);
//     if (!result.data) {
//       return res.status(404).json({ status: 'error', message: 'Client not found' });
//     }
//     const token = JWT.sign({ clientId: id }, JWT_SECRET_KEY, { expiresIn: '1h' });
//     return res.status(200).json({ status: 'success', message: 'Client deleted', token });
//   } catch (err) {
//     if (err instanceof ClientError) {
//       console.error(`ClientError: ${err.message}`, { code: err.code });
//       return res.status(err.code || 400).json({ status: 'error', message: err.message });
//     }
//     console.error('Internal server error:', err);
//     return res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// }

// async function handleSendUpdate(req, res) {
//   const { id } = req.params;
//   const { text } = req.body;
//   console.log('Sending update');
//   console.log({ id, text });

//   // Ensure text is not empty
//   const validationResult = await clientValidationSchema.partial().safeParseAsync({ id, text });
//   if (validationResult.error) {
//     return res.status(400).json({ status: 'error', message: 'Invalid update data', details: validationResult.error });
//   }
//   if (!text || text.trim() === '') {
//     return res.status(400).json({ status: 'error', message: 'Notification text cannot be empty' });
//   }

//   try {
//     const result = await ClientService.sendUpdate(id, text);
//     if (!result.data) {
//       return res.status(404).json({ status: 'error', message: 'Client not found' });
//     }
//     const token = JWT.sign({ clientId: id, text }, JWT_SECRET_KEY, { expiresIn: '1h' });
//     return res.status(200).json({ status: 'success', message: 'Notification sent', token });
//   } catch (err) {
//     if (err instanceof ClientError) {
//       console.error(`ClientError: ${err.message}`, { code: err.code });
//       return res.status(err.code || 400).json({ status: 'error', message: err.message });
//     }
//     console.error('Internal server error:', err);
//     return res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// }

// module.exports = {
//   handleGetClients,
//   handleGetClientById,
//   handleCreateClient,
//   handleUpdateClient,
//   handleDeleteClient,
//   handleSendUpdate,
// };



const { clientValidationSchema } = require('../lib/validators/client.validator');
const ClientService = require('../service/clientService');
const ClientError = require('../errors/index');
const JWT = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '$a!yam@2024';

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is missing. Please set it in environment variables.');
}

async function handleGetClients(req, res) {
  console.log('Fetching all clients');

  try {
    const clientsResponse = await ClientService.getClients();
    // Log clients to console
    console.log('Clients fetched from database:');
    clientsResponse.data.clients.forEach(client => {
      console.log(`- ID: ${client._id}, Name: ${client.name}, Email: ${client.email}, Company: ${client.company}`);
    });
    const token = JWT.sign({ clientIds: clientsResponse.data.clients.map(c => c._id) }, JWT_SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ status: 'success', data: clientsResponse.data, token });
  } catch (err) {
    if (err instanceof ClientError) {
      console.error(`ClientError: ${err.message}`, { code: err.code });
      return res.status(err.code || 400).json({ status: 'error', message: err.message });
    }
    console.error('Internal server error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

async function handleGetClientById(req, res) {
  const { id } = req.params;
  console.log('Fetching client by ID');
  console.log({ id });

  const validationResult = await clientValidationSchema.partial().safeParseAsync({ id });
  if (validationResult.error) {
    return res.status(400).json({ status: 'error', message: 'Invalid client ID', details: validationResult.error });
  }

  try {
    const clientResponse = await ClientService.getClientById(id);
    if (!clientResponse.data) {
      return res.status(404).json({ status: 'error', message: 'Client not found' });
    }
    const token = JWT.sign({ clientId: clientResponse.data._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ status: 'success', data: clientResponse.data, token });
  } catch (err) {
    if (err instanceof ClientError) {
      console.error(`ClientError: ${err.message}`, { code: err.code });
      return res.status(err.code || 400).json({ status: 'error', message: err.message });
    }
    console.error('Internal server error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

async function handleCreateClient(req, res) {
  const body = req.body;
  console.log('Creating client');
  console.log(body);

  const validationResult = await clientValidationSchema.safeParseAsync(body);
  if (validationResult.error) {
    return res.status(400).json({ status: 'error', message: 'Invalid client data', details: validationResult.error });
  }

  const { name, email, phone, cases, documents, lastContact, billingStatus, totalBilled, preferredContact, avatar, company, userId } = validationResult.data;

  try {
    const clientResponse = await ClientService.createClient({
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
      userId,
    });
    const token = JWT.sign({ clientId: clientResponse.data._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
    return res.status(201).json({ status: 'success', data: clientResponse.data, token });
  } catch (err) {
    if (err instanceof ClientError) {
      console.error(`ClientError: ${err.message}`, { code: err.code });
      return res.status(err.code || 400).json({ status: 'error', message: err.message });
    }
    console.error('Internal server error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

async function handleUpdateClient(req, res) {
  const { id } = req.params;
  const body = req.body;
  console.log('Updating client');
  console.log({ id, body });

  const validationResult = await clientValidationSchema.partial().safeParseAsync({ ...body, id });
  if (validationResult.error) {
    return res.status(400).json({ status: 'error', message: 'Invalid update data', details: validationResult.error });
  }

  try {
    const clientResponse = await ClientService.updateClient(id, body);
    if (!clientResponse.data) {
      return res.status(404).json({ status: 'error', message: 'Client not found' });
    }
    const token = JWT.sign({ clientId: clientResponse.data._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ status: 'success', data: clientResponse.data, token });
  } catch (err) {
    if (err instanceof ClientError) {
      console.error(`ClientError: ${err.message}`, { code: err.code });
      return res.status(err.code || 400).json({ status: 'error', message: err.message });
    }
    console.error('Internal server error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

async function handleDeleteClient(req, res) {
  const { id } = req.params;
  console.log('Deleting client');
  console.log({ id });

  const validationResult = await clientValidationSchema.partial().safeParseAsync({ id });
  if (validationResult.error) {
    return res.status(400).json({ status: 'error', message: 'Invalid client ID', details: validationResult.error });
  }

  try {
    const result = await ClientService.deleteClient(id);
    if (!result.data) {
      return res.status(404).json({ status: 'error', message: 'Client not found' });
    }
    const token = JWT.sign({ clientId: id }, JWT_SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ status: 'success', message: 'Client deleted', token });
  } catch (err) {
    if (err instanceof ClientError) {
      console.error(`ClientError: ${err.message}`, { code: err.code });
      return res.status(err.code || 400).json({ status: 'error', message: err.message });
    }
    console.error('Internal server error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

async function handleSendUpdate(req, res) {
  const { id } = req.params;
  const { text } = req.body;
  console.log('Sending update');
  console.log({ id, text });

  const validationResult = await clientValidationSchema.partial().safeParseAsync({ id, text });
  if (validationResult.error) {
    return res.status(400).json({ status: 'error', message: 'Invalid update data', details: validationResult.error });
  }
  if (!text || text.trim() === '') {
    return res.status(400).json({ status: 'error', message: 'Notification text cannot be empty' });
  }

  try {
    const result = await ClientService.sendUpdate(id, text);
    if (!result.data) {
      return res.status(404).json({ status: 'error', message: 'Client not found' });
    }
    const token = JWT.sign({ clientId: id, text }, JWT_SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ status: 'success', message: 'Notification sent', token });
  } catch (err) {
    if (err instanceof ClientError) {
      console.error(`ClientError: ${err.message}`, { code: err.code });
      return res.status(err.code || 400).json({ status: 'error', message: err.message });
    }
    console.error('Internal server error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

module.exports = {
  handleGetClients,
  handleGetClientById,
  handleCreateClient,
  handleUpdateClient,
  handleDeleteClient,
  handleSendUpdate,
};