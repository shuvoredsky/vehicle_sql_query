CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  role VARCHAR(20) CHECK (role IN ('admin', 'customer'))
);

CREATE TABLE vehicles(
  vehicle_id SERIAL PRIMARY KEY,
  vehicle_name VARCHAR(30) NOT NULL,
  vehicle_type VARCHAR(20) NOT NULL
  CHECK (vehicle_type IN('car','bike','truck')),
  model VARCHAR(50) NOT NULL,
  registration_number VARCHAR(40) UNIQUE NOT NULL,
  rental_price DECIMAL(10,2) NOT NULL,
  availability_status VARCHAR(20) NOT NULL 
  CHECK (availability_status IN ('available', 'rented', 'maintenance'))
);


CREATE TABLE bookings(
  booking_id SERIAL PRIMARY KEY,
  vehicle_id INT REFERENCES vehicles(vehicle_id),
  user_id INT REFERENCES users(user_id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  booking_status VARCHAR(20) CHECK 
  (booking_status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  total_cost DECIMAL(10,2)
);



