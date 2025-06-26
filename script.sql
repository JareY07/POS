-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistema_pos;
USE sistema_pos;

-- Tabla Cuenta
CREATE TABLE Cuenta (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    NumeroCuenta VARCHAR(100) NOT NULL UNIQUE,
    TipoCuenta VARCHAR(100) NOT NULL,
    Saldo DOUBLE NOT NULL DEFAULT 0,
    FechaApertura DATE NOT NULL,
    Activa BOOLEAN DEFAULT TRUE,
    FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Cliente
CREATE TABLE Cliente (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(150) NOT NULL,
    Direccion TEXT,
    Telefono VARCHAR(50),
    CorreoElectronico VARCHAR(150),
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Activo BOOLEAN DEFAULT TRUE
);

-- Tabla Producto
CREATE TABLE Producto (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    NombreProducto VARCHAR(150) NOT NULL,
    Descripcion VARCHAR(150),
    PrecioUnitario DOUBLE NOT NULL,
    Existencia INT NOT NULL DEFAULT 0,
    CodigoBarras VARCHAR(50) UNIQUE,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    Activo BOOLEAN DEFAULT TRUE
);

-- Tabla Venta
CREATE TABLE Venta (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ClienteId INT,
    CuentaId INT,
    FechaVenta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Total DOUBLE NOT NULL,
    Estado VARCHAR(50) NOT NULL DEFAULT 'PENDIENTE',
    MetodoPago VARCHAR(50),
    FOREIGN KEY (ClienteId) REFERENCES Cliente(Id),
    FOREIGN KEY (CuentaId) REFERENCES Cuenta(Id)
);

-- Tabla DetalleVenta
CREATE TABLE DetalleVenta (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    VentaId INT NOT NULL,
    ProductoId INT NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DOUBLE NOT NULL,
    FOREIGN KEY (VentaId) REFERENCES Venta(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductoId) REFERENCES Producto(Id)
);

-- Tabla Historial
CREATE TABLE Historial (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    TablaAfectada VARCHAR(100) NOT NULL,
    IdRegistroAfectado INT NOT NULL,
    FechaModificacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Descripcion VARCHAR(150) NOT NULL,
    Usuario VARCHAR(100) NOT NULL,
    Accion VARCHAR(50) NOT NULL -- CREATE, UPDATE, DELETE
);

-- Tabla Usuario
CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, 
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Índices para mejorar el rendimiento
CREATE INDEX idx_venta_cliente ON Venta(ClienteId);
CREATE INDEX idx_venta_cuenta ON Venta(CuentaId);
CREATE INDEX idx_detalle_venta ON DetalleVenta(VentaId);
CREATE INDEX idx_detalle_producto ON DetalleVenta(ProductoId);
CREATE INDEX idx_historial_registro ON Historial(TablaAfectada, IdRegistroAfectado);

-- Datos iniciales
INSERT INTO Cuenta (NumeroCuenta, TipoCuenta, Saldo, FechaApertura) VALUES 
('CTE-001', 'CORRIENTE', 10000.00, CURDATE()),
('AHO-001', 'AHORROS', 5000.00, CURDATE());

INSERT INTO Cliente (Nombre, Direccion, Telefono, CorreoElectronico) VALUES 
('Cliente General', 'Dirección principal', '00000000', 'cliente@general.com'),
('Juan Pérez', 'Calle 123, Ciudad', '12345678', 'juan@example.com');

INSERT INTO Producto (NombreProducto, Descripcion, PrecioUnitario, Existencia, CodigoBarras) VALUES 
('Producto 1', 'Descripción producto 1', 10.50, 100, '750100000001'),
('Producto 2', 'Descripción producto 2', 25.75, 50, '750100000002'),
('Producto 3', 'Descripción producto 3', 5.25, 200, '750100000003');

INSERT INTO usuario (nombre, email, password) 
VALUES ('Admin POS', 'admin@pos.com', '123456');

INSERT INTO usuario (nombre, email, password) 
VALUES ('Admin POS', 'admin@example.com', 'password');