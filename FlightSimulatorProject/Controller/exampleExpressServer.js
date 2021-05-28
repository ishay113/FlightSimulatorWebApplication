const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../Model/AnomalyDetector')
const cors = require('cors')
const fs = require('fs');


const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(fileUpload())
app.use(express.static('../View'))

app.get("/", (req, res) => {
    res.sendFile("index.html")
})

function detect(req) {
    let list_of_anomalies;
    // let list_of_anomalies = {
    //     anomalies: [
    //         {
    //             timestamp: "32",
    //             columns: "A-C",
    //             value: "4.5"
    //         },
    //         {
    //             timestamp: "45",
    //             columns: "A-C",
    //             value: "4.8"
    //         }
    //     ]
    // }
    if (req.files) {
        let model_type;
        if (req.body.model_type === "regression") {
            model_type = 0;
        } else {
            model_type = 1;
        }

        let train_file = req.files.train_file
        let test_file = req.files.predict_file


        // save train and test files to specific location
        fs.writeFileSync("Data/train_file.csv", train_file.data.toString());
        fs.writeFileSync("Data/test_file.csv", test_file.data.toString());

        // model.trainAndPredict(model_type);
        list_of_anomalies = JSON.parse(fs.readFileSync('../Model/res/anomaly-report.json'));

        fs.unlink('Data/train_file.csv', function (err) {
            if (err) throw err;
        });
        fs.unlink('Data/test_file.csv', function (err) {
            if (err) throw err;
        });

        // fs.unlink('../Model/res/anomaly-report.json', function (err) {
        //     if (err) throw err;
        // });
    }

    return list_of_anomalies
}

app.post("/detect", (req, res) => {
    let list_of_anomalies = detect(req)
    res.json(list_of_anomalies)

    res.end()
})

app.post("/detectHTML", (req, res) => {
    let list_of_anomalies = detect(req);

    // parse json to strings
    list_of_anomalies.anomalies.forEach(function (anomaly) {
        res.write(`Anomaly found in line ${anomaly.timestamp}! The relevant columns are ${anomaly.columns}.\n`);
        // res.write('-'.repeat(18) + '\n');
        // res.write(`${anomaly.timestamp}` + ' '.repeat(6 - (anomaly.timestamp.length)) + '|' +
        //     `${anomaly.columns}` + ' '.repeat(8 - anomaly.columns.length) + '|' + '\n');
    })
    // res.write('-'.repeat(18) + '\n');
    res.end()
})

// app.post("/search", (req, res) => {
//     res.write('searching for ' + req.body.key+ +':\n')
//     let key = req.body.key
//     if(req.files) {
//         let file = req.files.text_file
//         let result = model.searchText(key, file.data.toString())
//         res.write(result)
//     }
//     res.end()
// })
app.listen(8080, () => console.log("listening..."))