const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../Model/AnomalyDetector')

const app = express()
app.use(express.urlencoded({
    extended: true
}))
app.use(fileUpload())
app.use(express.static('../View'))

app.get("/", (req, res) => {
    res.sendFile("index.html")
})

app.post("/detect", (req, res) => {
    res.write('searching for ' + ',' +':\n')
    let key = ','
    if(req.files) {
        let model_type = req.body.model_type
        let train_file = req.files.train_file
        let test_file = req.files.predict_file

        let anomaly_detector = model.train(model_type, train_file.data.toString())

        let list_of_anomalies = model.predict(anomaly_detector, test_file.data.toString())
        res.write(list_of_anomalies)
    }
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
app.listen(8080, ()=>console.log("listening..."))