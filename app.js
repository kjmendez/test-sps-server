var express = require('express');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var authRouter = require('./routes/auth');
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', verificarToken, usersRouter);
app.use('/home', verificarToken, homeRouter);

app.use('/auth', authRouter);

app.get('/protegido', verificarToken, (req, res) => {
    res.status(200).send({ 
        message: 'Acceso permitido',
        usuario: req.user.usuario
    });
});

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if(authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'secretkey', (err, user) => {
            if(err) {
                return res.status(403).send({
                    message: 'Token invalido'
                });
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: 'No hay token'
        })
    }
}


const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


module.exports = app;
