const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Config middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
); //xử lý dữ liệu được submit khi sử dụng thẻ <form></form>
app.use(express.json()); //xử lý dữ liệu khi sử dụng JS để submit

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resource/views'));

// =========================

// Routes init
route(app);

app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`);
});
