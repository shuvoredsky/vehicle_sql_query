# Vehicle Rental System - Database Design & SQL Queries

## Assignment 3 - Database Management System

---

## Table of Contents

- [Overview](#overview)
- [Part 1: ERD Design](#part-1-erd-design)
- [Part 2: SQL Implementation](#part-2-sql-implementation)
- [Part 3: Theory Questions](#part-3-theory-questions)

---

## Overview

This project demonstrates the design and implementation of a **Vehicle Rental System** database. The system manages users, vehicles, and bookings with proper relational database design principles.

### Technologies Used

- **Database:** PostgreSQL / MySQL
- **ERD Tool:** Lucidchart
- **Concepts:** ERD Design, SQL Queries, Database Relationships

---

## Part 1: ERD Design

### Entity Relationship Diagram

**Lucidchart Link:** [Insert Your Public Shareable Link Here]

### Tables Designed

#### 1. Users Table

- `user_id` (PK) - Serial Primary Key
- `user_name` - VARCHAR(100)
- `email` - VARCHAR(100) UNIQUE
- `password` - VARCHAR(255)
- `phone` - VARCHAR(15)
- `role` - VARCHAR(20) CHECK (admin/customer)

#### 2. Vehicles Table

- `vehicle_id` (PK) - Serial Primary Key
- `vehicle_name` - VARCHAR(30)
- `vehicle_type` - VARCHAR(20) CHECK (car/bike/truck)
- `model` - VARCHAR(50)
- `registration_number` - VARCHAR(40) UNIQUE
- `rental_price` - DECIMAL(10,2)
- `availability_status` - VARCHAR(20) CHECK (available/rented/maintenance)

#### 3. Bookings Table

- `booking_id` (PK) - Serial Primary Key
- `vehicle_id` (FK) - References vehicles(vehicle_id)
- `user_id` (FK) - References users(user_id)
- `start_date` - DATE
- `end_date` - DATE
- `booking_status` - VARCHAR(20) CHECK (pending/confirmed/completed/cancelled)
- `total_cost` - DECIMAL(10,2)

### Relationships

- **One to Many:** User → Bookings (একজন user অনেক booking করতে পারে)
- **Many to One:** Bookings → Vehicle (অনেক booking একটি vehicle এর জন্য)
- **One to One:** Each booking connects exactly one user and one vehicle

---

## Part 2: SQL Implementation

### Database Schema Creation

#### Create Users Table

```sql
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  role VARCHAR(20) CHECK (role IN ('admin', 'customer'))
);
```

#### Create Vehicles Table

```sql
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
```

#### Create Bookings Table

```sql
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
```

### Sample Data Insertion

#### Insert Users

```sql
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
```

#### Insert Vehicles

```sql
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
```

#### Insert Bookings

```sql
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
```

---

## SQL Queries

### Query 1: JOIN

**Objective:** Retrieve booking information along with customer name and vehicle name.

**Concepts:** INNER JOIN

```sql
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
```

---

### Query 2: EXISTS

**Objective:** Find all vehicles that have never been booked.

**Concepts:** NOT EXISTS

```sql
SELECT *
FROM vehicles v
WHERE NOT EXISTS (
  SELECT 1
  FROM bookings b
  WHERE b.vehicle_id = v.vehicle_id
);
```

---

### Query 3: WHERE

**Objective:** Retrieve all available vehicles of a specific type (cars).

**Concepts:** SELECT, WHERE

```sql
SELECT *
FROM vehicles
WHERE vehicle_type = 'car'
AND availability_status = 'available';
```

---

### Query 4: GROUP BY and HAVING

**Objective:** Find the total number of bookings for each vehicle and display only those vehicles that have more than 2 bookings.

**Concepts:** GROUP BY, HAVING, COUNT

```sql
SELECT
  v.vehicle_name,
  COUNT(*) as total_bookings
FROM bookings b
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
GROUP BY v.vehicle_name
HAVING COUNT(*) > 2;
```

---

## Part 3: Theory Questions

### Question 1: What is a foreign key and why is it important in relational databases?

**Answer:**
A foreign key is a column in one table that references the primary key of another table, creating a relationship between the two tables. In our database, `user_id` and `vehicle_id` in the bookings table are foreign keys.

**Importance:**

- Maintains data integrity
- Enforces referential integrity
- Establishes relationships between tables
- Ensures data consistency

---

### Question 2: What is the difference between WHERE and HAVING clauses in SQL?

**Answer:**

- **WHERE:** Filters individual rows before grouping; cannot use aggregate functions
- **HAVING:** Filters groups after grouping; used with aggregate functions like COUNT, SUM

**Example:**

- WHERE: Filter vehicles by type before grouping
- HAVING: Filter vehicle groups by booking count after grouping

---

### Question 3: What is a primary key and what are its characteristics?

**Answer:**
A primary key uniquely identifies each row in a table.

**Characteristics:**

1. Uniqueness - No duplicate values
2. NOT NULL - Must have a value
3. One per table - Only one primary key allowed
4. Immutable - Should not change
5. Automatically indexed - For faster searching

**Examples:** user_id, vehicle_id, booking_id

---

### Question 4: What is the difference between INNER JOIN and LEFT JOIN in SQL?

**Answer:**

- **INNER JOIN:** Returns only matching rows from both tables
- **LEFT JOIN:** Returns all rows from left table and matching rows from right table (NULL for non-matches)

**Example:**

- INNER JOIN: Shows only booked vehicles
- LEFT JOIN: Shows all vehicles including those never booked

---

## Video Recording

**Video Link:** [Insert Your Video Link Here]

**Topics Covered:**

- Foreign Key explanation
- WHERE vs HAVING
- Primary Key characteristics
- INNER JOIN vs LEFT JOIN

---

## Conclusion

This assignment demonstrates understanding of:

- ERD design with proper relationships
- Database schema implementation
- SQL query writing (JOIN, EXISTS, WHERE, GROUP BY, HAVING)
- Database theory concepts

---

## Author

**Name:** [Your Name]  
**Email:** [Your Email]  
**Date:** December 23, 2024

---

## References

- Assignment Documentation
- PostgreSQL Documentation
- Lucidchart ERD Tool
