import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import Schema from './schema/schema.js';
import connectDB from './db/connectDB.js';
import cors from 'cors'
import 'dotenv/config';

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server runnning on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
