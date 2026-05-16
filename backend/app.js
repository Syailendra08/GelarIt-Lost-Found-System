const express = require('express')
const app = express()
const port = 3000

const db = require('./models')
const authRoute = require("./routes/auth.route");
const categoryRoute = require("./routes/category.route");
const userRoute = require("./routes/user.route");
const locationRoute = require("./routes/location.route");
const methodOverride = require('method-override')
const {checkToken} = require('./middlewares/auth')
const {checkAdmin} = require('./middlewares/auth')

//mencoba koneksi ke database serta menyambungkan model ke db

db.sequelize.authenticate()
    .then(() => console.log("Database berhasil tersambung"))
    .catch(err => console.error(err))

app.use(express.json());
app.use(methodOverride("_method")); 
app.use("/", authRoute); 
app.use("/categories", checkToken, checkAdmin, categoryRoute) ; 
app.use("/users", checkToken, checkAdmin, userRoute  )
app.use("/locations", checkToken, locationRoute);

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(port, () => {
    console.log(`Example App listening on port ${port}`)
})

