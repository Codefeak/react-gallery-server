const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest:'/tmp/uploads/' , filename:(req,file,cb)=>{cb(null,file.fieldname + 'jpg.webp')}});
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ProblemChild:bzz4uu8eDU@ig001-nt7pi.mongodb.net/UserList", {useNewUrlParser:true});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };
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
const Informations = mongoose.model('Informations', schema1);


app.get('/api', (req,res)=>{ 
    Informations.find({},(err,info)=>{
        if(err)console.log(err);
        return (res.json(info));
    })
}); 

app.post('/login', (req,res)=>{
    User.find({username:req.body.username}, (err,user)=>{
        if(err)console.log(err);
        user.map(item=>{
            if(item.password === req.body.password){
                console.log(mongoose);
                return (res.json(item));
            }
        })
    });
});

// app.post('/login/addNew', (req,res)=>{
//     Informations.create(req.body, (err,user)=>{
//         if(err)console.log('err', err);
//     });
//     upload.single('src'),(req,res,next)=>{

//     }
//     Informations.find({}, (err,users)=>{
//         return(res.json(users));
//     })
// });

app.post('login/addNew', upload.single('src'),(req,res)=>{
    console.log(req.body);
    const tmpPath = req.file.path;
    const targetPath = path.join(__dirname, './uploads/images.png');
    if(path.extname(req.file.originalname).toLowerCase()==='.png'){
        fs.rename(tmpPath, targetPath, err =>{
            if (err) return handleError(err, res);
            res
                .status(200)
                .contentType('text/plain')
                .end('File Uploaded!');
        });
    }else {
        fs.unlink(tmpPath, err =>{
            if(err)return handleError(err, res);
            res
                .status(403)
                .contentType('text/plain')
                .end('Only .png files are allowed')
        });
    }
})

app.delete('/login/delete', (req,res)=>{
    req.body.map(item=>{
        Informations.deleteOne({ _id:item._id }, (err, user)=>{
            if(err)console.log('err', err);
        })
    })
    Informations.find({}, (err,users)=>{
        return(res.json(users));
    })
});



app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})