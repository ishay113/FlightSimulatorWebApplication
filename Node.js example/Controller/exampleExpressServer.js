const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../Model/AnomalyDetector')
const cors = require('cors')
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

function detect(req){
    let list_of_anomalies = {
        anomalies: [
            {
                timestamp: "32",
                columns: "A-C",
                value: "4.5"
            },
            {
                timestamp: "45",
                columns: "A-C",
                value: "4.8"
            }
        ]
    }
    if (req.files) {
        let model_type = req.body.model_type
        let train_file = req.files.train_file
        let test_file = req.files.predict_file

        let anomaly_detector = model.train(model_type, train_file.data.toString())

        list_of_anomalies = {anomalies: model.predict(anomaly_detector, test_file.data.toString())}
    }

    return list_of_anomalies
}
app.post("/detect", (req, res) => {
    let list_of_anomalies = detect(req)
    res.json(list_of_anomalies)

    res.end()
})

app.post("/detectHTML", (req, res) => {
    let list_of_anomalies = detect(req)

    // parse json to strings
    list_of_anomalies.anomalies.forEach(function(anomaly){
        // res.write(`Anomaly found in line ${anomaly.timestamp}! The relevant columns are ${anomaly.columns} and the value is ${anomaly.value}\n`);
        res.write('-'.repeat(24)+'\n');
        res.write(`${anomaly.timestamp}`+' '.repeat(6-(anomaly.timestamp.length)) + '|' +
        `${anomaly.columns}` + ' '.repeat(8 - anomaly.columns.length) + '|' + `${anomaly.value}` + '\n');
    })
    res.write('-'.repeat(24)+'\n');
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