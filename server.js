var express = require("express");
var cors = require("cors");
var fileUpload = require("express-fileupload");
require("dotenv").config();

var app = express();

app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 },
	})
);
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/upload", function (req, res) {
	if (req.files.upfile) {
    let { name, mimetype, size } = req.files.upfile
		res.status(200).json({
			"name": name,
			"type": mimetype,
			"size": size,
		});
	}
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Your app is listening on port " + port);
});
