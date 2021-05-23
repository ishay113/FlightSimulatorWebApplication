function train(model_type, train_csv){
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

    return anomaly_detector
}

function predict(anomaly_detector, test_csv){
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