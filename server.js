const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

mongoose.connect (process.env.MONGODB_URI || "mongodb+srv://ProblemChild:bzz4uu8eDU@ig001-nt7pi.mongodb.net/UserList", {useNewUrlParser:true})
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const schema1 = {
    username:{
        type:String,
    },
    password:{
        type:String,
    }
};

const User = mongoose.model('User', schema1);


app.get('/', (req,res)=>{  

});

app.post('/login', (req,res)=>{
    User.find({username:req.body.username}, (err,user)=>{
        if(err)console.log(err);
        user.map(item =>{
            if(item.password === req.body.password){
                return(res.json(item));
            }
        })
    })
})



app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})