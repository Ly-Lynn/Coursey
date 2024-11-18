CREATE TABLE IF NOT EXISTS Courses (
  course_id INT PRIMARY KEY,
  course_name VARCHAR(255),
  course_intro VARCHAR(255),
  lecturer_id INT,
  host_id INT,
  image VARCHAR(255),  
  url_list VARCHAR(255),
  rate FLOAT DEFAULT 1,
  hours INT,
  cost FLOAT DEFAULT 0,
  field VARCHAR(255),
  learners INT,
  views INT,
  gained VARCHAR(255),
  required VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Videos (
  video_id INT PRIMARY KEY,
  course_id INT,
  video_path VARCHAR(255),
  script VARCHAR(255),
  url VARCHAR(255),
  fps INT,
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE IF NOT EXISTS Hosts (
  host_id INT PRIMARY KEY,
  host_name VARCHAR(255),
  logo_image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  gmail VARCHAR(255),
  password VARCHAR(255),
  reset_token VARCHAR(255) NULL,
  avatar VARCHAR(255) NULL,
  quote VARCHAR(255) NULL,
  university_id INT NULL,
  is_verified TINYINT(1) DEFAULT 0,
  is_admin TINYINT(1) DEFAULT 0,
  access_token VARCHAR(255) NULL,
  refresh_token VARCHAR(255) NULL,
  FOREIGN KEY (university_id) REFERENCES Hosts(host_id)
);

CREATE TABLE IF NOT EXISTS UserCourses (
  user_id INT,
  course_id INT,
  current_video_id INT,
  is_completed TINYINT(1),
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id),
  FOREIGN KEY (current_video_id) REFERENCES Videos(video_id)
);

CREATE TABLE IF NOT EXISTS Lecturers (
  lecturer_id INT PRIMARY KEY,
  name VARCHAR(255),
  bio VARCHAR(255),
  avatar VARCHAR(255)
);

ALTER TABLE Courses
  ADD FOREIGN KEY (lecturer_id) REFERENCES Lecturers(lecturer_id),
  ADD FOREIGN KEY (host_id) REFERENCES Hosts(host_id);
