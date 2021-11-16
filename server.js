import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

//App config
const app = express();
const port = 2000;
const connection_url = 'mongodb+srv://admin:snGMyDPMeLzEHnJe@cluster0.h8dti.mongodb.net/dating-app-mern?retryWrites=true&w=majority';
//Middleware
app.use(express.json())
app.use(Cors())
    //DB config
    // mongoose.connect(connection_url, {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useUnifiedTopology: true
    // })
mongoose.connect(
    connection_url,
    async(err) => {
        if (err) throw err;
        console.log("conncted to db")
    }
)

//API Endpoints

app.get("/", (req, res) => {
    res.status(200).send("Hello TheWebdeveloper")
})

app.post('/dating/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/dating/cards', (req, res) => {
        Cards.find((err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        })
    })
    //Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));