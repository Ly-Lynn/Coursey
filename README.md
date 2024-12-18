# Coursey
**Coursey** is a web platform designed for real-time learning, where users can access courses and materials instantly and interactively.

![System Overview](img/main_page.png)

## System Overview
------------------

![System Overview](img/overview_system.png)

## Getting Started
-------------------

### Prerequisites

* Clone the repository: `git clone https://github.com/Ly-Lynn/Coursey`

### Frontend

#### Setup and Launch

1. Navigate to the frontend directory: `cd front-end`
2. Run the command to start the frontend: `npm start --build`
3. Access the User Interface at: `http://localhost:3000`
4. Access the Admin Panel at: `http://localhost:8082`

**Important:** The Admin password is located in `back-end/.env/.env`. Please ensure to keep this information secure.

### Backend

#### Setup and Launch

1. Navigate to the backend directory: `cd back-end`
2. Run the command to start the backend: `docker-compose up --build`

### Database

#### Access and Configuration

1. Access the SQL admin at: `http://localhost:8081`
2. Import the database schema from `back-end/sql/docker-php_export.sql` using the SQL command interface.

## Contributing
------------

We welcome contributions to Coursey. Please submit a pull request with your changes and we will review them promptly.

## License
-------

Coursey is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgments
---------------

We would like to thank the open-source community for their contributions to the development of Coursey.