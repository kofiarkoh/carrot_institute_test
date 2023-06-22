## Project Information
This is is simple tasks management app with the following featuers.
- user registration
- user login
- create tasks
- update task status
- delete task
  
since this is only a test application, there is not email verification when registering and also there is no password reset.

The backend is implemented with laravel framework v10 and it's located in the `backend` directory within this repo.
The front end was made using NextJS (React) and its located in the `front-end` folder.

#### Steps to Run the backend server
- run `cd backend` to change directory to the backend folder in your terminal.
- copy the contents of `.env.example` to a new file `.env`
- modify the follow part of the `.env` as show below.
  ```
    DB_DATABASE=your_mysql_database_name
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password
    ```
- run `composer install` to install dependencies
- run `php artisan serve`
- copy the url shown in your terminal


#### Steps to Run the front-end
- run `cd front-end`.
- change the `BASE_URL` in `front-end/src/api/base.ts` to match the server url show when you run `php artisan serve`. Remember to add the `/api` at the end of your port.
- run `npm run dev` to start the NextJS dev server.
- open the app url shown in your terminal to begin using the app. it is usually `http://localhost:3000`
