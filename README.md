# FlightSimulator Web Application

A web application for the, used to detect anomalies in flight data  <br/>
Implmented using Node.js technology and dll addOn to cpp files (node-gyp).

## Video
You can watch a tease of using our application in the link: 
https://youtu.be/MWDSuNtkAMQ

## Installing 
* Download and install Node.js on your machine -https://nodejs.org/en/
* After cloning the project please run `npm install` to install all the required dependencies.
* Please make sure to install following packages globally: `npm install -g node-gyp` and if you're using windows also install `npm install --g --production windows-build-tools`

## Run Preperation
* Please make sure to run the following commands from the Model directory, run in command prompt:
* `node-gyp configure`
* `node-gyp build`
* To run the web app server pleaes navigate to the Controller directory inside FlightSimulatorProject and run the following command `node exampleExpressServer.js`.
* Now the server is up and running on your local machine at localhost:8080

## About the app
The web app looks as follows:
![Untitled](https://user-images.githubusercontent.com/72696075/120071910-e639a980-c099-11eb-9868-8246c4d283f8.png)

## Application Features
There are 2 main features of our app:
The first is the web app that is opened through your browser of choice, in which you should navigate to http://localhost:8080/ .
Once opened, the user uploads the flight data files, one for training the algorithm and one for testing. The user should also choose between two modes - regression / hybrid.
Afterwards, the user will click the "Detect!" button and the results will be retrieved to the screen as shown below:
![Untitled](https://user-images.githubusercontent.com/72696075/120071226-f3a16480-c096-11eb-8596-9b2e40461344.png)

The second feature is giving the user the option to send an HTTP POST request to the sever, the request should include the details for which algorithm to use.
The user will add append a propper CSV files for training the algorithm and for the detection of the anomalies in the test file. The server response will be the detected anomalies as a JSON format.

Regression:
![regression](https://user-images.githubusercontent.com/72696075/120071503-6bbc5a00-c098-11eb-9615-1d7d3ecf720c.jpg)

Hybrid:
![hybrid](https://user-images.githubusercontent.com/72696075/120071511-72e36800-c098-11eb-9fba-0e8e250f798c.jpg)


## UML Diagram of the project

![UML-MVC](https://user-images.githubusercontent.com/72696075/120071289-44b15880-c097-11eb-8866-3d5d323a99fe.png)


Enjoy!!!
