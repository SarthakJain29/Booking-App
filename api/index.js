require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.js');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

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

app.listen(4000);