const express = require('express')
const app = express()
const port = 3000

const db = require('./models')
const authRoute = require("./routes/auth.route");
const categoryRoute = require("./routes/category.route");
const userRoute = require("./routes/user.route");
const locationRoute = require("./routes/location.route");
const itemRoute = require("./routes/item.route");
const commentRoute = require("./routes/comment.route");
const requestRoute = require("./routes/request.route");
const notificationRoute = require("./routes/notification.route");
const methodOverride = require('method-override')
const {checkToken} = require('./middlewares/auth')
const {checkAdmin} = require('./middlewares/auth')
const cors = require("cors");

//mencoba koneksi ke database serta menyambungkan model ke db

db.sequelize.authenticate()
    .then(() => console.log("Database berhasil tersambung"))
    .catch(err => console.error(err))

app.use(express.json());
app.use(cors());
app.use(methodOverride("_method")); 
app.use('/uploads', express.static('uploads'))
app.use("/", authRoute); 
app.use("/categories", checkToken, categoryRoute) ; 
// CRUD User management untuk admin makanya pake checkAdmin
app.use("/users", checkToken, checkAdmin, userRoute  )
app.use("/locations", checkToken, locationRoute);
app.use("/items",  itemRoute )
app.use("/", checkToken, commentRoute)
app.use("/", requestRoute );
app.use("/", checkToken, notificationRoute);



app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(port, () => {
    console.log(`Example App listening on port ${port}`)
})

