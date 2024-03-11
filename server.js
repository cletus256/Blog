const express = require('express');
const path = require('path');
const fileupload =require('express-fileupload');

let initial_path = path.join(__dirname, "");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());


app.get('/', (req, res) =>{
    res.sendFile(path.join(initial_path, "index"));
})

app.get('/editor', (req, res) =>{
    res.sendFile(path.join(initial_path, "editor"));
})

//upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date =new Date();
    //image name
    let imagename = date.getDate() + date.getTime() + file.name;

    //image upload
    let path = '/uploads/' + imagename;

    //create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        }else{
            //image being uploaded path
            res.json('uploads/${imagename}')
        }
    })
})
app.listen("5000", () => {
    console.log('listening..........');
})