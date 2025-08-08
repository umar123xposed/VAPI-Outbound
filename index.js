import express from 'express';
import dotenv from 'dotenv';
import callRoutes from './router/call.js';
import webHook from './webhook/callreport.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3939;

app.use(express.json());
app.use('/api', callRoutes);
app.use('/api', webHook)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
