const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const path = require('path');
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ProblemChild:bzz4uu8eDU@ig001-nt7pi.mongodb.net/UserList", { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());
app.use('/images', express.static(path.join(__dirname + '/assets/images')));
app.use( express.static(path.join(__dirname, 'client/build')));


const schema = {
    username: {
        type: String,
    },
    password: {
        type: String,
    }
};

const schema1 = {
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    title: {
        type: String,
    },
    nationality: {
        type: String,
    },
    src: {
        type: String,
    },
    alt: {
        type: String,
    },
    skills: {
        type: Array,
    },
    whySofterDeveloper: {
        type: String,
    },
    longTermVision: {
        type: String,
    },
    motivatesMe: {
        type: String,
    },
    favoriteQuote: {
        type: String,
    },
    joinedOn: {
        type: String,
    }
}

const User = mongoose.model('User', schema);
const Informations = mongoose.model('Informations', schema1);

/**
 * Multer config for file upload
 */
const storage = multer.memoryStorage();
const upload = multer({ storage :storage });


app.post('/login/addNew/upload', upload.single('file'), (req,res)=>{
    if(!req.files){
        return res.send(400).send('No files were uploaded');
    }
    console.log(req.files);
    req.files.file.mv(`./assets/images/thumbnails/${req.files.file.name}`, err=>{
        if(err)return res.status(500).send(err);
        res.send('File Uploaded');
    });
});


app.get('/api', (req, res) => {
    Informations.find({}, (err, info) => {
        if (err) console.log(err);
        return (res.json(info));
    })
});

app.post('/login', (req, res) => {
    User.find({ username: req.body.username }, (err, user) => {
        if (err) console.log(err);
        user.map(item => {
            if (item.password === req.body.password) {
                console.log(mongoose);
                return (res.json(item));
            }
        })
    });
    
});

app.get('/login/images/:id', (req, res) => {
    const id = req.params.id;
    res.sendFile(id, { root: ('assets/images') });
});

app.get('/login/images/thumbnails/:id', (req, res) => {
    const id = req.params.id;
    res.sendFile(id, { root: ('assets/images/thumbnails') });
});

app.post('/login/addNew', (req, res) => {
    Informations.create(req.body, (err, user) => {
        if (err) console.log('err', err);
    });
    Informations.find({}, (err, users) => {
        return (res.json(users));
    })
});

app.delete('/login/delete', (req, res) => {
    req.body.map(item => {
        Informations.deleteOne({ _id: item._id }, (err, user) => {
            if (err) console.log('err', err);
        })
    })
    Informations.find({}, (err, users) => {
        return (res.json(users));
    })
});

app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
    
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})