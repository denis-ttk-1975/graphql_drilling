import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import schema from './../schema/schema.js';

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://2den4u:denis@cluster0.struflw.mongodb.net/graphql_drill?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.get('/', (req, res) => {
  res.send('Hello! But you need to try /graphql endpoint!');
});
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log('Server started!');
});
