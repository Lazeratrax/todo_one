const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth',require('./src/routes/auth.route'))
app.use('/api/link',require('./src/routes/link.route'))

const PORT = config.get('port' || 5000)

async function start() {
    try {
        await mongoose.connect(config.get('MongoUri'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
app.listen(PORT, () => console.log(`сервер грузится на localhost:${PORT}`))
    } catch (e) {
        console.log('Error server in start', e)
    }
}

start()