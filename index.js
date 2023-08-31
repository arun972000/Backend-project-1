import express, { json } from 'express';
import fs from 'fs'

const app = express();

app.use(json())

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello")
})


app.get("/createFile", (req, res) => {
    const date = new Date();
    const format = date.toISOString().replace(/:/g, '-');
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var myDate = today.toLocaleDateString() // current date format eg: 31/08/2023
    myDate = myDate.split("/");
    var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    const final = newDate.getTime().toString();  // time stamp format


    fs.writeFile(`./backup/${format}.txt`, final, (err) => {
        console.log(err)
    })

    res.send(final)
})


app.get("/viewFiles", (req, res) => {
    try {
        const fileNames = fs.readdirSync("./backup");
        res.send(`filesnames: ${fileNames}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error listing text files.');
    }
})


app.listen(PORT, () => console.log(`App listening at port ${PORT}`));