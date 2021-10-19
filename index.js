import express from 'express';

import router from './router.js';

const PORT = process.env.PORT || 8000;

const app = express();
app.use(router);

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
