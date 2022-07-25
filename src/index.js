const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Config middleware
// Xử lý dữ liệu được submit khi sử dụng thẻ <form></form>
app.use(
    express.urlencoded({
        extended: true,
    }),
); 
app.use(express.json()); //xử lý dữ liệu khi sử dụng JS để submit

// Ghi đè các phương thức mặc định thành các phương thức mà browser chưa hỗ trợ: PUT, PATCH, DELETE... nếu có _method
app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware)

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'
                const icons = {
                    default: "oi oi-elevator",
                    asc: "oi oi-sort-ascending",
                    desc:"oi oi-sort-descending",
                }

                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
              </a>`
            }
        }
    }),
    
);

// VD middleware
app.get('/middleware',
    function(req, res, next){
        if(['veThuong', 'veVip'].includes(req.query.ve)){
            req.love = 'Everybody'
            next()
        }
        res.status(403).json({message: "Access denied"})
    },
    function (req, res, next){
        res.json({message: "Access successfully",
            love: req.love    
        })
    }
)

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resource/views'));

// =========================

// Routes init
route(app);

app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`);
});
