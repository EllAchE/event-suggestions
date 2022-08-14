export const express = require('express');
export const app = express();
export const router = express.Router();
export const port = 3000;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(jsonParser);
