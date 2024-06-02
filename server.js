import express from 'express';
import urlRouter from './routes/url.js';
import redirectRouter from './routes/redirectUrl.js'
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = 3000;

// 使用 express.json() 解析 JSON 請求體
app.use(express.json());

app.use('/api', urlRouter);

app.use('/', redirectRouter)

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}

export default app;