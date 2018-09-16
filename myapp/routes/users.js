const dbConnection = require('../config/dbConnection');

module.exports = app => {

    const connection = dbConnection();

    app.get('/users', (req, res) => {
        console.log('GET')
        connection.query('SELECT * FROM users', (err, result) => {
        res.render('users', {
        users: result
    });
});
});

    app.post('/users', (req, res) => {
        console.log("POST")
        const { username, password } = req.body;
    connection.query('INSERT INTO users SET ? ',
        {
            username,
            password
        }
        , (err, result) => {
        res.redirect('/users');
});
});
};
