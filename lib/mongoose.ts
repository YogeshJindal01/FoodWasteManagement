import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodwastereduction';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Define the cached connection
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare the global variable for TypeScript
declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: MongooseConnection | undefined;
}

// Initialize the cached connection
const cached: MongooseConnection = global.mongooseConnection || {
  conn: null,
  promise: null,
};

// Set the global variable for future use
if (!global.mongooseConnection) {
  global.mongooseConnection = cached;
}

export async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      connectTimeoutMS: 30000,
      socketTimeoutMS: 60000,
    };

    console.log(`Connecting to MongoDB at ${MONGODB_URI.substring(0, MONGODB_URI.indexOf('@') > 0 ? MONGODB_URI.indexOf('@') : 10)}...`);
    
    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts);
    } catch (error) {
      console.error('Initial MongoDB connection error:', error);
      cached.promise = null;
      throw error;
    }
  }
  
  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully');
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB connection error:', error);
    throw error;
  }

  return cached.conn;
}

export default connectToDB; 