5. encryting the password
5a. we have directly added the password but we have to encrypt it, we wouldnt want to expose the direct password
5b, the code for this is added in the client in the api folder 

6. creating and connecting the database.
6a. created a database in the mongoatlas and connected it via the connection string, find the connection string in the index.js file 
6b. created the schema and models from it to use them. find the code in user.js in api folder
6c. I got an error called the ' Cannot use import statement outside a module', so I have used another way of importing the modules or files, and it got solved.
6d. declared the model and created it, used it to save in the database, checkout the code in api>index.js

7. error handling 
7a. while declaring the schema, we have declared that username nd password should be unique, if you send the same username/password the server will crash and wont take further
7b. so we check if the response is okay and handle the error.
7c. in the error handling, we have seen that the server is being crashed so, we fixed it first. we have added the error handling to it, to prevent the server crash, can find the code in index.js

8. after the login and registering, we have added a navigate to give the home page once you have logged in find code in the LoginPage.jsx

9. in the home page, we have register and login, if the user has logged in, we dont want them. For that, first we need to validate that the user is logged in, we do that with jwt tokens, by grabbing from the request. But anyone can inject the cookie and use them for validation. We try verifying the jwt with the secret we have used to create it. we have used the useEffect hook to do this. the code starts in the Header.jsx and the route for that is defined in the index.js. 