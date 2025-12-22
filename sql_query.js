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


INSERT INTO users (user_name, email, password, phone, role) VALUES
('Rahim Ahmed', 'rahim@example.com', 'pass123', '01712345678', 'customer'),
('Karim Hassan', 'karim@example.com', 'pass456', '01812345678', 'customer'),
('Fatima Khan', 'fatima@example.com', 'pass789', '01912345678', 'customer'),
('Admin User', 'admin@example.com', 'admin123', '01612345678', 'admin'),
('Sadia Islam', 'sadia@example.com', 'pass321', '01512345678', 'customer'),
('Mehedi Hasan', 'mehedi@example.com', 'pass654', '01412345678', 'customer'),
('Nadia Rahman', 'nadia@example.com', 'pass987', '01312345678', 'customer'),
('Shakib Ali', 'shakib@example.com', 'pass111', '01212345678', 'customer'),
('Taslima Begum', 'taslima@example.com', 'pass222', '01112345678', 'customer'),
('Habib Khan', 'habib@example.com', 'pass333', '01012345678', 'customer');


INSERT INTO vehicles (vehicle_name, vehicle_type, model, registration_number, rental_price, availability_status) VALUES
('Toyota Corolla', 'car', '2022', 'DHA-1234', 3500.00, 'available'),
('Honda Civic', 'car', '2023', 'DHA-5678', 4000.00, 'rented'),
('Yamaha R15', 'bike', 'V3', 'DHA-9101', 800.00, 'available'),
('Suzuki Gixxer', 'bike', 'SF', 'DHA-1121', 700.00, 'available'),
('Tata Truck', 'truck', 'LPT 2518', 'DHA-3141', 8000.00, 'maintenance'),
('Mahindra Pickup', 'truck', 'Bolero', 'DHA-5161', 5000.00, 'available'),
('BMW X5', 'car', '2024', 'DHA-7181', 10000.00, 'rented'),
('Hero Splendor', 'bike', 'Plus', 'DHA-9202', 500.00, 'available'),
('Nissan Patrol', 'car', '2021', 'DHA-1222', 6000.00, 'available'),
('Royal Enfield', 'bike', 'Classic 350', 'DHA-3242', 1200.00, 'rented');


INSERT INTO bookings (vehicle_id, user_id, start_date, end_date, booking_status, total_cost) VALUES
(2, 1, '2024-12-15', '2024-12-20', 'completed', 20000.00),
(7, 2, '2024-12-18', '2024-12-22', 'confirmed', 40000.00),
(10, 3, '2024-12-20', '2024-12-25', 'confirmed', 6000.00),
(1, 5, '2024-12-10', '2024-12-12', 'completed', 7000.00),
(3, 6, '2024-12-22', '2024-12-24', 'pending', 1600.00),
(4, 7, '2024-12-01', '2024-12-03', 'cancelled', 1400.00),
(9, 8, '2024-12-25', '2024-12-30', 'pending', 30000.00),
(1, 9, '2024-12-05', '2024-12-08', 'completed', 10500.00),
(2, 1, '2024-12-28', '2025-01-02', 'pending', 20000.00),
(3, 2, '2024-12-12', '2024-12-14', 'completed', 1600.00);



// Query 1

SELECT 
  b.booking_id,
  u.user_name,
  v.vehicle_name,
  b.start_date,
  b.end_date,
  b.booking_status
FROM bookings b
INNER JOIN users u ON b.user_id = u.user_id
INNER JOIN vehicles v ON b.vehicle_id = v.vehicle_id;


// query 2

SELECT * 
FROM vehicles v
WHERE NOT EXISTS (
  SELECT 1 
  FROM bookings b
  WHERE b.vehicle_id = v.vehicle_id
);


// query 3
SELECT * FROM vehicles v
WHERE v.vehicle_type = 'car' AND v.availability_status = 'available';