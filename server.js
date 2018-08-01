const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
const cors = require('cors');
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ProblemChild:bzz4uu8eDU@ig001-nt7pi.mongodb.net/UserList", {useNewUrlParser:true})

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const schema = {
    username:{
        type:String,
    },
    password:{
        type:String,
    }
};

const schema1 = {
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    title:{
        type:String,
    },
    nationality:{
        type:String,
    },
    src:{
        type:String,
    },
    alt:{
        type:String,
    },
    skills:{
        type:Array,
    },
    whySofterDeveloper:{
        type:String,
    },
    longTermVision:{
        type:String,
    },
    motivatesMe:{
        type:String,
    },
    favoriteQuote:{
        type:String,
    },
    joinedOn:{
        type:String,
    }
}

const User = mongoose.model('User', schema);
const Information = mongoose.model('Information', schema1);


app.post('/api', (req,res)=>{ 
    console.log(Information);
});

app.post('/login', (req,res)=>{
    console.log('a');
    User.find({username:req.body.username}, (err,user)=>{
        if(err)console.log(err);
        user.map(item=>{
            console.log(item);
            if(item.password === req.body.password){
                console.log(mongoose);
                return (res.json(item));
            }
        })
    });
});



app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})