CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  role VARCHAR(20) CHECK (role IN ('admin', 'customer'))
);