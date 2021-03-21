/* eslint-disable consistent-return */
import mongoose from 'mongoose';

interface MyGlobal extends NodeJS.Global {
  mongo: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

declare var global: MyGlobal;

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongo;

if (!cached) {
  global.mongo = { conn: null, promise: null };
  cached = global.mongo;
}

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  if (MONGODB_URI == null) {
    throw new Error('Could not set up database. Mongo uri is null');
  }
  if (cached.promise == null) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
