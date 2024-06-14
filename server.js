import Express from 'express';
import cors from 'cors';

const App = Express();
const PORT = 5000;

App.use(cors({origin: '*'}));

App.use('/hi', (req, res) => {
    res.send({hi: 'hi'})
});

App.listen(PORT, () => {
    console.log(`Server's up and running on port ${PORT} `);
});