const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());


// demo database
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];
const models = [
    {model_id: 1, upload_time: "time", status: "ready"},
    {model_id: 2, upload_time: "time", status: "ready"},
    {model_id: 3, upload_time: "time", status: "ready"}
];


//todo get model
app.get('/api/model', (req, res) => {
    // parse parameters
    // const model_id = req.body.model_id;
    const model = models.find(m => m.model_id === parseInt(req.query.model_id));
    if (!model) res.status(404).send('The model with the given ID was not found');

    // go to DB and get the data for model_id

    // send response
    res.send(model);
});


// todo get all the active models
app.get('/api/models', (req, res) => {

    // go to DB and get the data for models

    // send response
    res.send(models);
});

// todo post data to train the model
app.post('/api/model', (req, res) => {
    // parse parameters
    const model_type = {model_type: req.query['model_type']};

    // send the model
    res.send();

});
// todo post data to detect anomalies
app.post('/api/anomaly', (req, res) => {

});

// todo delete the model
app.delete('/api/model/:model_id', (req, res) => {

    //look-up the model
    // not existing - return 404
    const model = models.find(m => m.model_id === parseInt(req.params.model_id));
    if (!model) res.status(404).send('The model with the given ID was not found');

    //delete
    const index = models.indexOf(model);
    models.splice(index, 1);

    //return the same
    res.send(model);
});

/**
 * examples
 */
app.post('/api/courses', (req, res) => {


    // const schema = {name: Joi.string().min(3).required()};
    // const result = Joi.validate(req.body, schema);
    // console.log(result);
    //
    // if (result.error) {
    //     res.status(400).send(result.error)
    //     return;
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.query);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');
    res.send(course); // 404
});

const port = 9876;
app.listen(port, () => console.log(`listening on port ${port}...`));
