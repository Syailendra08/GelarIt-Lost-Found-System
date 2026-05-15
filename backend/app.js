const express = require('express')
const app = express()
const port = 3000

const db = require('./models')
const authRoute = require("./routes/auth.route");
const methodOverride = require('method-override')
const {checkToken} = require('./middlewares/auth')

//mencoba koneksi ke database serta menyambungkan model ke db

db.sequelize.authenticate()
    .then(() => console.log("Database berhasil tersambung"))
    .catch(err => console.error(err))

app.use(express.json());
app.use(methodOverride("_method")); 
app.use("/auth", authRoute);   

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(port, () => {
    console.log(`Example App listening on port ${port}`)
})

