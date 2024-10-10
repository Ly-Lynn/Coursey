CREATE TABLE "Courses" (
  "course_id" int PRIMARY KEY,
  "course_name" varchar(255),
  "course_intro" varchar(255),
  "lecturer_id" int,
  "host_id" int,
  "image" varchar(255),
  "url_list" varchar(255),
  "rate" float DEFAULT 1,
  "videos" int[],
  "hours" int,
  "cost" float DEFAULT 0,
  "field" varchar(255),
  "learners" integer,
  "views" integer
);

CREATE TABLE "Videos" (
  "video_id" int PRIMARY KEY,
  "course_id" int,
  "video_path" varchar(255),
  "script" varchar(255),
  "url" varchar(255),
  "fps" int
);

CREATE TABLE "Users" (
  "id" int PRIMARY KEY,
  "gmail" varchar(255),
  "password" varchar(255),
  "reset_token" varchar(255),
  "avatar" varchar(255),
  "quote" varchar(255),
  "university_id" int,
  "is_verified" bool,
  "is_admin" bool
);

CREATE TABLE "UserCourses" (
  "user_id" int,
  "course_id" int,
  "current_video_id" int,
  "is_completed" bool
);

CREATE TABLE "Lecturers" (
  "lecturer_id" int PRIMARY KEY,
  "name" varchar(255),
  "bio" varchar(255),
  "avatar" varchar(255)
);

CREATE TABLE "Hosts" (
  "host_id" int PRIMARY KEY,
  "host_name" varchar(255),
  "logo_image" varchar(255)
);

ALTER TABLE "Courses" ADD FOREIGN KEY ("lecturer_id") REFERENCES "Lecturers" ("lecturer_id");

ALTER TABLE "Courses" ADD FOREIGN KEY ("host_id") REFERENCES "Hosts" ("host_id");

ALTER TABLE "Videos" ADD FOREIGN KEY ("course_id") REFERENCES "Courses" ("course_id");

ALTER TABLE "Users" ADD FOREIGN KEY ("university_id") REFERENCES "Hosts" ("host_id");

ALTER TABLE "UserCourses" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "UserCourses" ADD FOREIGN KEY ("course_id") REFERENCES "Courses" ("course_id");

ALTER TABLE "UserCourses" ADD FOREIGN KEY ("current_video_id") REFERENCES "Videos" ("video_id");
