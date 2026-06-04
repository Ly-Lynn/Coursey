# Coursey
**Coursey** is a web platform designed for real-time learning, where users can access courses and materials instantly and interactively.

![System Overview](img/main_page.png)

## System Overview
------------------

![System Overview](img/overview_system.png)

## Getting Started
-------------------

### Prerequisites

* Clone the repository: `git clone https://github.com/Ly-Lynn/Coursey` i created fork from this repository
* The newest version is in my repository, you can clone it here: `git clone https://github.com/gryffin-uit-alpha/Coursey`

### Frontend

#### Setup and Launch

1. Navigate to the frontend directory: `cd front-end`
2. Run the command to install dependencies: `npm install`
3. Run the command to start the frontend: `npm start `
4. Access the User Interface at: `http://localhost:3000`
5. Access the Admin Panel at: `http://localhost:8082`

**Important:** The Admin password is located in `back-end/.env/.env`. Please ensure to keep this information secure.

### Backend

#### Setup and Launch

1. Navigate to the backend directory: `cd back-end`
2. Run the command to start the backend: `docker compose up --build`

### Database

#### Access and Configuration

1. Import the database schema from `back-end/sql/docker-php_export.sql` using the SQL command interface. Make sure you are in root folder of the project.
```sh
docker exec -i back-end-db-1 mysql -u root -pgryffin0811 docker-php < back-end/sql/docker-php_export.sql
```

## Contributing
------------

We welcome contributions to Coursey. Please submit a pull request with your changes and we will review them promptly.

## License
-------

Coursey is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgments
---------------

We would like to thank the open-source community for their contributions to the development of Coursey.
Your SQL admin is accessible at http://localhost:8081.

Navigate to ```back-end\sql\docker-php_export.sql``` and import it into the SQL admin server using the SQL command interface.

### Accounts
- Admin Account:
```sh
username: lynn
password: 12345

```
- Database Account:
```sh
username: gryffin0811
password: gryffin0811
```
