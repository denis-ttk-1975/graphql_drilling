import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './../schema/schema.js';

const app = express();
const PORT = 3005;

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log('Server started!');
});
