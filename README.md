# College Placement

[collegeplacement](https://warm-headland-28579.herokuapp.com/)

Simulated Placement website where students and companies can register and student can apply for jobs

## Installation
Install all depandency with `npm install`

Run the server using `node app.js`

## Description
Application in developed in MVC architecture. <br>
There are three kinds of models - student, company, job all are stored in models folder. This is `SPA` and all the navigtion is done 
using angular router. 
The angular has been built but I have still attached the angular-src.

## Basic Architecture

* There are two types of users - students and companies and three models
student, company, jobs.
* Companies and students both have a separate login-signup, for companies
index in their email address, for student their college enrollment number.
* All the profile pages are guarded using jwt token
* Companies can post jobs, which are then shown in their dashboard with a
button to see the details of applied students.
* Students can see all the posted jobs and can apply for the job, they can’t
however unregister for the website of unregister their job application.

## NPM packages used

* `passport-jwt` for user authentication
* `bcrypt.js` for password hashing and verification
* `angular-jwt` for authGuard
* `nodemon` for server rs

## Snapshot


![companyDashboard](https://cloud.githubusercontent.com/assets/26198774/26725819/f2cd18d4-47bd-11e7-9c56-30cee7a721b4.png)


![postJob](https://cloud.githubusercontent.com/assets/26198774/26725852/19bf4732-47be-11e7-9bfa-6054066474c0.png)


![studentDashboard](https://cloud.githubusercontent.com/assets/26198774/26725885/3d8536c2-47be-11e7-9f50-bcc1a597f4bc.png)



