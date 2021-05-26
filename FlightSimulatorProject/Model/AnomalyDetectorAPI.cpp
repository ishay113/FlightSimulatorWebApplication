// #include "every cpp you need, NOT the h .cpp"
#include <node.h>
#include <string>
#include <iostream>
#include <vector>
#include <exception>

#include "../Model/detectionLogic/anomaly_detection_util.h"
#include "../Model/detectionLogic/minCircle.h"
#include "../Model/detectionLogic/timeseries.h"
#include "../Model/detectionLogic/AnomalyDetector.h"
#include "../Model/detectionLogic/SimpleAnomalyDetector.h"
#include "../Model/detectionLogic/HybridAnomalyDetector.h"


 //just put in all these usings, they're for node to use.
 namespace whateverNamespace {
    using v8::Context;
    using v8::Function;
    using v8::FunctionCallbackInfo;
    using v8::FunctionTemplate;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::Persistent;
    using v8::String;
    using v8::Value;
    using v8::Array;
    using v8::Exception;
    using namespace std; //for the strings

    void Method(const FunctionCallbackInfo<Value>&args) /*needs to have exactly that as the argument*/ {

        int model_type = (int)args[0].As<Number>()->Value();

        ofstream file;

        SimpleAnomalyDetector simple_anomaly_detector;
        HybridAnomalyDetector ad;
        TimeSeries train("../Data/train_file.csv");

        TimeSeries test("../Data/test_file.csv");

        vector<AnomalyReport> anomalies_vector;

        if (model_type == 0) {
            simple_anomaly_detector.learnNormal(train);

            anomalies_vector = simple_anomaly_detector.detect(test);
        }

        else {
            ad.learnNormal(train);

            anomalies_vector = ad.detect(test);
        }

        string jsonString = "{";
        string key, val;
        int vecSize = anomalies_vector.size();
        for (int i = 0; i < vecSize; i++){
            key = anomalies_vector[i].description;
            val = to_string(anomalies_vector[i].timeStep);
            printf("key: %s, val: %s\n", key.c_str(), val.c_str());
            if (i != vecSize - 1)
                jsonString += "\"" +key + "\"" + ": " + "\"" + val + "\"" + ",";
            else
                jsonString += "\"" +key + "\"" + ": " + "\"" + val + "\"";
        }
        jsonString += "}";
        ofstream jsonFile;
        jsonFile.open("../Model/res/anomaly-report.json");
        jsonFile << jsonString;
        jsonFile.close();
    }


    // Initialize write exactly as is, NODE_SET_METHOD have the 2nd arg be the name you want to use in JS and the 3rd arg is the function here
    void Initialize(Local<Object> exports) {
        NODE_SET_METHOD(exports, "AnomalyDetectorFunc", Method);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize); // this needs to be at the end, don't touch
 }
