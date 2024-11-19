# API curl

Replate the host. (localhost if local)

## auth
- signup

```bash
    curl -X POST http:/localhost:8080/auth/signup.php \
    -H "Content-Type: application/json" \
    -d '{
    "username": "lynn",
    "password": "123",
    "gmail": "lynn@gmail.com"
    }'
```

- login

```bash
    curl -X POST http:/localhost:8080/auth/login.php \
    -H "Content-Type: application/json" \
    -d '{
    "username": "lynn",
    "password": "123",
    }'
```

- change Password

```bash
    curl -X POST http://localhost:8080/auth/changePassword.php \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9" \
    -d '{"username": "lynn", "newPassword": "abc"}'
```

-  logout

```bash
    curl -X GET http:/localhost:8080/auth/logout.php
```

## users

- getUsers

```bash
    curl -X POST http://localhost:8080/users/getUsers.php \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9" \
    -d '{"username": "lynn"}'
```

- getAllUsers

```bash
    curl -X POST http://localhost:8080/users/getAllUsers.php \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9" \
    -d '{"username": "lynn"}'
```

- updateUsers

```bash
    curl -X PUT http://localhost:8080/users/updateUsers.php \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9" \
    -d '{
    "username": "lynn",
    "gmail": "lynn@gmail.com",
    "quote": "Love or promote"
    }'
```

- deleteUsers

```bash
    curl -X PUT http://localhost:8080/users/deleteUsers.php \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9" \
    -d '{
    "username": "lynn",
    "deletedUser": "khoatn",
    }'
```

## courses
- Get course info with specific courseID and accestoken
```bash
    curl -X GET "http://localhost:8080/course/getCourseInfo.php?courseID=101" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9" \
    -H "Content-Type: application/json" \
    -d '{"userID": 1, "username": "lynn"}'

```

- Check the course is bought by a user
```bash
    curl -X GET "http://localhost:8080/course/checkCourseUser.php?courseID=101" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9" \
    -H "Content-Type: application/json" \
    -d '{"userID": 1, "username": "lynn"}'
```

- Get the list of best Rating Courses
```bash
    curl -X GET "http://localhost:8080/course/getBestRatingCourse.php" \
    -H "Content-Type: application/json"
```

- Get the list of best Viewing Courses
```bash
    curl -X GET "http://localhost:8080/course/getBestViewCourse.php" \
    -H "Content-Type: application/json"
```

- Get URL video List from utube Link list (python)

```bash

    curl -X POST "http://localhost:8080/python/getUrllist" \
    -H "Content-Type: application/json" \
    -d '{
        "url": "https://www.youtube.com/playlist?list=PLoROMvodv4rOca_Ovz1DvdtWuz8BfSWL2"
    }'
```  



## Admin Panel

- Add new Lecture
```bash
    curl -X POST http://localhost:8080/adminPanel/lecturerService.php \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9" \
    -d '{
        "username": "lynn",
        "lecturerID": 100,
        "name": "HoangNgocLuong",
        "bio": "An experienced lecturer in Evolution",
        "avatar": "avatar.png"
    }'
```

- Get lecturer info with leturerID
```bash
    curl -X GET "http://localhost:8080/adminPanel/lecturerService.php?lecturerI2"
```

- Delete lecturer
```bash
    curl -X DELETE "http://localhost:8080/adminPanel/lecturerService.php?lecturerID=100" \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9" \
    -d '{
        "username": "lynn"
    }'

```

- Update lecture info
```bash
    curl -X PUT "http://localhost:8080/adminPanel/lecturerService.php" \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9" \
    -d '{
        "username": "lynn", 
        "bio": "Machinelearning is ez", #option
        "lecturerID": 3
    }'
```



