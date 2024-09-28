## Personal Expense Tracker ##

This is the repository covers a personal project which is called Personal Expense Tracker which is a web application that focuses on   
effectively tracking and managing of finances of an individual. 
This repo contains both the frontend as well as the backend of the application. 
The Frontend of the application is built using React and Tailwind.
The Backend of the application is built using NodeJs, ExpressJs and MongoDB.

For Authentication , JavaWebTokens has been used for token generating and verifyng. The authorization and authentication is totally handled by jwt.
The password are been hashed before storing in the db for extra security and commitment to the user. Even the service owner can decode the password. The hashing of password is done using BcryptJs library.

Specifically talking about the backend, the architecture is mix up of a monolithic and MVC structure , where the routes have been explicitely been defined in the routes folder and same goes for the controllers, models and middlewares.

When talking about the frontend, the major portion is covered by React and Tailwind. 
Routing has been covered using React-Router-Dom. As well as there are several hooks that has beem used in the project at various places , such as useState, useEffect , useNavigation etc which were available in the react and other libraries.

Firstly, I will tell you what is the flow of the project, then I will explain each and every module.

Firstly, the user signs up and creates an account.
