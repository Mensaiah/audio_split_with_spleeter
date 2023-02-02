const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { spawnSync } = require('child_process');
const fs = require('fs');
const app = express();
const fileUpload = require("express-fileupload");
app.use(cors());
app.use(express.json({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
dotenv.config();
const PORT = process.env.PORT || 1200;


app.use(
    fileUpload()
  );

    app.post("/split", async (req, res) => {
       const file = req.files.file
       const path = `./files/${file.md5}`
        await file.mv(path)
        const py = spawnSync('python3', ['split.py',path ]);
  
        console.log(py.stdout.toString());
        console.error(py.stderr.toString());

        //fs.unlinkSync(path)

        const vocalsPath = `${req.protocol}://${req.hostname}/audios/${file.md5}/vocals.wav`;
        const instrumentalPath = `${req.protocol}://${req.hostname}/audios/${file.md5}/instrumental.wav`;

        res.status(200).json({
            message: "Audio Split Successf",
            vocals: vocalsPath,
            instrumental: instrumentalPath,
        })

    });


  app.get("*", (req, res) => {
    res.send("App Working");
  });
  
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });