const mongoose = require('mongoose');
const express = require('express');
const user = require('./Router/userRouter');
const task = require('./Router/taskRouter');
const app = express()
const path = require("path")
const port = process.env.PORT
app.use(express.json())
app.use(express.static(path.join(__dirname, "../images")))
const multer = require('multer');
mongoose.connect(process.env.MONGODB);
app.get('/', (req, res) => res.send('Hello World!'))
app.use(user);
app.use(task)
const upload = multer({
    dest: 'images'
})
app.get('/upload', upload.single('upload'), (req, res) => {
    res.send("hello")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// https://drive.google.com/drive/folders/1KIbFW_QHq9ZRY7RLa8io72p8QwP4SS8z?zx=sxmtv3h9bcro