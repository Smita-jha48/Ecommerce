require('dotenv').config();
const express = require('express');
const {customerRoute} = require('./src/routes');
const PORT = 3000;

const app = express();
app.use(express.json());

app.use('/api', customerRoute);

app.listen(PORT, (error) => {
  if (!error)
    console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
  else
    console.log('Error occurred', error);
}
);
