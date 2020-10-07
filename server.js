const express = require('express')

const DB = require('./config/db')

DB();

const app = express();

var cors = require('cors')

app.use(cors())


app.use(express.json());




app.use('/api/users', require('./routes/users'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));



app.get('/', (req, res) => res.send('application running'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`application running on Port : ${PORT}`));