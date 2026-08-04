const { MongoClient } = require('mongodb');

// MongoDB connection URI from environment variable
const uri = process.env.MONGODB_URI;

// Connection instance to reuse across invocations
let client = null;

async function connectToDatabase() {
  if (client) {
    return client;
  }
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is missing.");
  }
  client = new MongoClient(uri);
  await client.connect();
  return client;
}

module.exports = async (req, res) => {
  // We only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'Missing id parameter' });
    }

    const dbClient = await connectToDatabase();
    const db = dbClient.db('giftingco');
    const giftsCollection = db.collection('gifts');

    // Find the document by _id
    const gift = await giftsCollection.findOne({ _id: id });

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    // Return the gift data
    res.status(200).json({
      components: gift.components,
      recipientName: gift.recipientName,
      createdAt: gift.createdAt
    });
  } catch (error) {
    console.error("Error fetching gift from MongoDB:", error);
    res.status(500).json({ error: 'Failed to fetch gift' });
  }
};
