const app = require('./config/server');

require('./routes/users')(app);

// starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
