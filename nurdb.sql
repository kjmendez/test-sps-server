-- Base de datos: nurdb

CREATE TABLE users (
  email varchar(50) NOT NULL,
  nombre varchar(70) NOT NULL,
  type varchar(20) NOT NULL,
  password varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO users (email, nombre, type, password) VALUES
('admin@spsgroup.com.br', 'admin', 'admin', '1234');


ALTER TABLE users
  ADD PRIMARY KEY (email);
COMMIT;

