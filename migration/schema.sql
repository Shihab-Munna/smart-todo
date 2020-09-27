create table user(
   user_id INT NOT NULL AUTO_INCREMENT,
   user_name VARCHAR(25) NOT NULL,
   email VARCHAR(30) NOT NULL,
   PRIMARY KEY (user_id)
);

create table notes(
   note_id INT NOT NULL AUTO_INCREMENT,
   user_id INT NOT NULL,
   note_title VARCHAR(250) NOT NULL,
   PRIMARY KEY (note_id),
   FOREIGN KEY (user_id) REFERENCES user(user_id)
);

create table task(
   task_id INT NOT NULL AUTO_INCREMENT,
   note_id INT NOT NULL,
   task VARCHAR(250) NOT NULL,

   PRIMARY KEY (task_id),
   FOREIGN KEY (note_id) REFERENCES notes(note_id)
);