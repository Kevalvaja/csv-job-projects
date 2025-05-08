const express = require('express');
const app = express();
const uploadRoutes = require('./routes/uploadRoutes');

app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));