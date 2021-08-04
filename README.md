# Virtual Legal Clinic

## Credits
*In alphabetical order*  
Bryan Choo  
Jemima Holly Ang  
Nicholas Tan  
Tor Ming En  
Trevor Ng  
Willis Pang

# Summary
A simple, client server application for a mock Virtual Legal Clinic. Relies on Singpass (Implememted as Mockpass, modified slightly.) for authentication. Uses Twilio Video for video conferencing abilities

# Tech Stack
* Client: React
* Server: Expressjs
* Others: Mockpass

# Deployment
* Terminologies
    * virtuallegalclinic -> Client app
    * vlcbackend -> Server app
    * mockpass-2.6.6 -> Mockpass
    
Start by loading `db.sql` into your MySQL Server.  
In each application, run `npm i` to install dependencies.
If using Docker, build each app using an appropriate method. The `Dockerfile` has been provided for each application.

Each application can also be run independently, using `npm start` in the respective folders. 

# Further modifications
A Twilio Video account is needed for the video conferencing function. Obtain an account  [here](https://www.twilio.com/video).  

After which, add the `TWILIO_ACCOUNT_SID`, `TWILIO_API_KEY`, and `TWILIO_API_SECRET` into the `.env` file in vlcbackend.

The `.env` file should contain the following"
```
DB_HOST=<db url>
DB_USER=<db username>
DB_PASSWORD=<db password>
DB_NAME=<db name>

AUTH_LEVEL=L0
MYINFO_APP_CLIENT_ID=VLC
MYINFO_APP_CLIENT_SECRET=44d953c796cccebcec9bdc826852857ab412fbe2
MYINFO_SIGNATURE_CERT_PUBLIC_CERT=./certs/spcp.crt
DEMO_APP_SIGNATURE_CERT_PRIVATE_KEY=./certs/key.pem
MYINFO_APP_REDIRECT_URL=http://localhost:3001/processmyinfo
MYINFO_API_TOKEN=http://localhost:5156/myinfo/v3/token
MYINFO_API_PERSON=http://localhost:5156/myinfo/v3/person

TWILIO_ACCOUNT_SID=
TWILIO_API_KEY=
TWILIO_API_SECRET=
```

# License
This project is licensed under the MIT License.