import Express from 'express';

const App = Express();
const PORT = 5000;

App.use('/hi', (req, res) => {
    res.send({hi: 'hi'})
});

App.listen(PORT);