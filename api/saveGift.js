const { MongoClient } = require('mongodb');
const { nanoid } = require('nanoid');

// MongoDB connection URI from environment variable
const uri = process.env.MONGODB_URI;

// Connection instance to reuse across invocations (Serverless Best Practice)
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
  // We only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { components, recipientName } = req.body;
    
    if (!components || !recipientName) {
      return res.status(400).json({ error: 'Missing components or recipientName' });
    }

    const dbClient = await connectToDatabase();
    const db = dbClient.db('giftingco');
    const giftsCollection = db.collection('gifts');

    // Generate a clean 5-character ID for the short link
    const shortId = nanoid(5);

    // Save the document using the shortId as the _id
    await giftsCollection.insertOne({
      _id: shortId,
      components: components,
      recipientName: recipientName,
      createdAt: new Date()
    });

    // Return the generated ID to the frontend
    res.status(200).json({ success: true, id: shortId });
  } catch (error) {
    console.error("Error saving gift to MongoDB:", error);
    res.status(500).json({ error: 'Failed to save gift' });
  }
};
