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
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzA5OTA0NDd9" \
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
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzA5OTMyMjR9" \
    -d '{"username": "lynn"}'
```

- getAllUsers

```bash
    curl -X POST http://localhost:8080/users/getAllUsers.php \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzA5OTMyMjR9" \
    -d '{"username": "lynn"}'
```

- updateUsers

```bash
    curl -X PUT http://localhost:8080/users/updateUsers.php \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imtob2F0biIsImV4cGlyeSI6MTczMDkwOTM0OH0=" \
    -d '{
    "username": "khoatn",
    "gmail": "khoatn@gmail.com",
    "quote": "No pain no gain"
    }'
```

- deleteUsers

```bash
    curl -X PUT http://localhost:8080/users/deleteUsers.php \
    -H "Content-Type: application/json" \
    -H "Authorization: eyJ1c2VybmFtZSI6Imtob2F0biIsImV4cGlyeSI6MTczMDkwOTM0OH0=" \
    -d '{
    "username": "khoatn",
    "deletedUser": "lynn",
    }'
```

