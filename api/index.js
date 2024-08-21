require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user.js');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'efjqfjkf13rnjn';

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res)=> {
    res.json("test okkkkk");
});

app.post('/register', async (req,res)=>{
    const{name,email,password} = req.body;
    try{
        const userdoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userdoc);
    }catch(e){
        res.status(422).json(e);
    }
    
})

app.post('/login', async (req, res) => {
    console.log('Login endpoint hit'); // This should print on every request to /login
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    const userDoc = await User.findOne({ email });

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign(
                { email: userDoc.email, id: userDoc._id }, 
                jwtSecret, 
                {}, 
                (err, token) => {
                    if (err) throw err;
                    console.log('Generated JWT:', token); 
                    res.cookie('token', token, { httpOnly: true }).json({ token, message: 'pass ok' });
                }
            );
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } else {
        res.status(422).json({ message: 'User not found' });
    }
});



app.listen(4000);