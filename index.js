const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); //

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

const models = [{model_id: 1, upload_time: "time", status: "ready"}];
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/model', (req, res) => {
    // parse parameters
    var model_id = req.query['model_id']

    // go to DB and get the data for model_id

    // send response
    res.send(courses);
});
app.get('/api/model', (req, res) => {
    // parse parameters
    var model_id = req.query['model_id']

    // go to DB and get the data for model_id

    // send response
    res.send(courses);
});
app.get('/api/model', (req, res) => {
    // parse parameters
    var model_id = req.query['model_id']

    // go to DB and get the data for model_id

    // send response
    res.send(courses);
});
app.get('/api/model', (req, res) => {
    // parse parameters
    var model_id = req.query['model_id']

    // go to DB and get the data for model_id

    // send response
    res.send(courses);
});


app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.get('/api/models', (req, res) => {
    res.send(models);
});

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.query);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');
    res.send(course); // 404
});
app.get('/api/model/:model_id', (req, res) => {
    // res.send(req.query);
    const model = models.find(m => m.model_id === parseInt(req.params.model_id));
    if (!model) res.status(404).send('The model with the given ID was not found');
    res.send(model); // 404
});

app.post('/api/courses', (req, res) => {

    const schema = {name: Joi.string().min(3).required()};
    const result = Joi.validate(req.body, schema);
    console.log(result);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


const port = process.env.PORT || 9876;
app.listen(port, () => console.log(`listening on port ${port}...`));
