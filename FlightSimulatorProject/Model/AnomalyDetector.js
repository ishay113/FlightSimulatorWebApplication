// first run "node-gyp configure" and "node-gyp build" for the build and release folders to appear along with your api
// after this is done, run "node main" to run this file. Every time you change the c++ run "node-gyp build" again,
// and if you changed anything in the configurations like how many functions you want to use etc, run "node-gyp configure" again

// then you can write this require. It will NOT autofill, but do it anyway.
const api = require('./build/Release/AnomalyDetectorAPI') //the name of your .node file in Release, according to your binding.gyp

function train(model_type, train_csv) {
    // TODO: training the anomaly detector
    /**
     * anomaly_detector is a json object which represents the anomaly detection system
     * For example:
     * {
     *     "columns": "A-C",
     *     "correlation": 0.8,
     *     "threshold": 3.2
     * }
     */

    api.AnomalyDetectorFunc(model_type);
}

function predict(anomaly_detector, test_csv) {
    // TODO: prediction using the anomaly detector
    /**
     * result is a list of anomalies
     * For example:
     * [
     *  {
     *     "timestamp": 32,
     *     "columns": "A-C",
     *     "value": 4.5
     *  },
     *  {
     *     "timestamp": 45,
     *     "columns": "A-C",
     *     "value": 4.8
     *  },
     *
     * ]
     */

    return anomaly_detector
}

module.exports.train = train
module.exports.predict = predict