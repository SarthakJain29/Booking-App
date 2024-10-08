require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/user.js');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'efjqfjkf13rnjn';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,               
}));

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
    const { email, password } = req.body;
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
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax', 
                    }).json(userDoc);
                    
                }
            );
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } else {
        res.status(422).json({ message: 'User not found' });
    }
});

app.get('/profile', (req,res) =>{
    const {token} = req.cookies;
    res.json({token});
})

app.listen(4000);