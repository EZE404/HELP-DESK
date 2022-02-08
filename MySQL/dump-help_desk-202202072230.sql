-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-02-2022 a las 01:35:27
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `help_desk`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

DROP TABLE IF EXISTS `areas`;
CREATE TABLE IF NOT EXISTS `areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `activa` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id`, `nombre`, `activa`) VALUES
(1, 'HELPDESK', 1),
(2, 'CALIDAD', 1),
(3, 'ADMINISTRACION', 1),
(4, 'SERVICIO TECNICO', 1),
(5, 'RRHH', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `dni` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_alta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `verificado` tinyint(1) NOT NULL DEFAULT '0',
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `dni`, `email`, `pass`, `telefono`, `fecha_alta`, `verificado`, `uuid`) VALUES
(1, 'Ezequiel', '36227970', 'eze@correo.com', '$2b$10$RTYfaDQRl/V7ZM3EgChq3egO2Y/aYAMPGjWjzVN5G1msb9Xb2y4SK', '1123917575', '2021-07-25 01:40:51', 0, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

DROP TABLE IF EXISTS `empleados`;
CREATE TABLE IF NOT EXISTS `empleados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `dni` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_alta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `verificado` tinyint(1) NOT NULL DEFAULT '1',
  `AreaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `email` (`email`),
  KEY `AreaId` (`AreaId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `dni`, `email`, `pass`, `telefono`, `fecha_alta`, `verificado`, `AreaId`) VALUES
(1, 'Ezequiel', '36227970', 'eze@correo.com', '$2b$10$W5OGiU60oFCiCelPhR6d8.gjQ5pU2gvEd9N3VvCqquoCsS8G5XkZy', '1123917575', '2021-07-25 01:40:51', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historials`
--

DROP TABLE IF EXISTS `historials`;
CREATE TABLE IF NOT EXISTS `historials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prioridad` varchar(255) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'NORMAL',
  `estado` varchar(255) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'Pendiente',
  `detalle` varchar(1000) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EmpleadoId` int(11) DEFAULT NULL,
  `AreaId` int(11) NOT NULL,
  `SolicitudId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EmpleadoId` (`EmpleadoId`),
  KEY `AreaId` (`AreaId`),
  KEY `SolicitudId` (`SolicitudId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `historials`
--

INSERT INTO `historials` (`id`, `prioridad`, `estado`, `detalle`, `fecha`, `EmpleadoId`, `AreaId`, `SolicitudId`) VALUES
(4, 'NORMAL', 'Pendiente', 'Solicitud ingresante', '2021-07-25 02:22:19', NULL, 1, 1),
(5, 'NORMAL', 'Pendiente', 'Solicitud ingresante', '2021-07-25 02:22:19', NULL, 1, 2),
(6, 'NORMAL', 'Pendiente', 'Solicitud ingresante', '2021-07-25 02:22:19', NULL, 1, 3),
(7, 'NORMAL', 'Derivado', 'solicitud derivada', '2021-07-29 00:21:24', 1, 4, 3),
(8, 'NORMAL', 'En proceso', 'solicitud atendida', '2021-07-29 00:23:00', 1, 4, 3),
(9, 'NORMAL', 'Derivado', 'solicitud derivada', '2021-07-29 00:23:56', 1, 2, 3),
(10, 'NORMAL', 'Derivado', 'solicitud derivada', '2021-07-29 00:25:25', 1, 2, 2),
(11, 'NORMAL', 'En proceso', 'reclamo solucionado', '2021-07-29 00:25:57', 1, 2, 2),
(12, 'ALTA', 'Derivado', 'Derivado de nuevo a serv. técnico', '2021-07-29 00:32:44', 1, 4, 3),
(13, 'NORMAL', 'Derivado', 'derivando de help desk a serv técnico', '2021-07-29 01:10:00', 1, 4, 1),
(14, 'ALTA', 'Resuelto', 'para prueba de evento de 36 horas', '2021-08-02 02:07:44', 1, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacions`
--

DROP TABLE IF EXISTS `notificacions`;
CREATE TABLE IF NOT EXISTS `notificacions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `SolicitudId` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `mensaje` varchar(1000) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `SolicitudId` (`SolicitudId`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `notificacions`
--

INSERT INTO `notificacions` (`id`, `SolicitudId`, `fecha`, `mensaje`) VALUES
(101, 3, '2021-07-29 00:32:44', '2021-07-29 00:32:44'),
(102, 2, '2021-07-29 00:25:57', '15 DAYS EVENT: reclamo solucionado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizedata`
--

DROP TABLE IF EXISTS `sequelizedata`;
CREATE TABLE IF NOT EXISTS `sequelizedata` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizedata`
--

INSERT INTO `sequelizedata` (`name`) VALUES
('20210725005128-areas.js'),
('20210725011649-admin.js'),
('20210725014748-cliente-demo.js'),
('20210725020606-solicitudes-demo.js'),
('20210725050330-historiales-demo.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210725024506-area.js'),
('20210725032441-empleado.js'),
('20210725035555-cliente.js'),
('20210725041006-solicitud.js'),
('20210725042149-historial.js'),
('20210725043230-notificacion.js'),
('20210726040921-string_1000.js'),
('20210726050217-session.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE IF NOT EXISTS `session` (
  `sid` varchar(255) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `session`
--

INSERT INTO `session` (`sid`, `userId`, `expires`, `data`) VALUES
('asdashdkjahsdkajhdjksahjkdahksd', NULL, NULL, NULL),
('jiHekvBOWK_a1Ec9FRPoicw1LUuM24bf', NULL, '2021-08-04 20:09:08', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"nombre\":\"Ezequiel\",\"dni\":\"36227970\",\"email\":\"eze@correo.com\",\"telefono\":\"1123917575\",\"fechaAlta\":\"2021-07-25T04:40:51.000Z\",\"pass\":\"$2b$10$RTYfaDQRl/V7ZM3EgChq3egO2Y/aYAMPGjWjzVN5G1msb9Xb2y4SK\",\"verificado\":false,\"uuid\":\"aaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"},\"type\":\"cliente\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicituds`
--

DROP TABLE IF EXISTS `solicituds`;
CREATE TABLE IF NOT EXISTS `solicituds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_alta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(1000) COLLATE utf8_spanish_ci DEFAULT NULL,
  `uuid` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ClienteId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `ClienteId` (`ClienteId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `solicituds`
--

INSERT INTO `solicituds` (`id`, `fecha_alta`, `tipo`, `descripcion`, `uuid`, `ClienteId`) VALUES
(1, '2021-07-25 01:40:51', 'TEST C', 'DEMO SOLICITUD 1', 'DEMO1', 1),
(2, '2021-07-25 01:40:51', 'TEST B', 'DEMO SOLICITUD 2', 'DEMO2', 1),
(3, '2021-07-25 01:40:51', 'TEST A', 'DEMO SOLICITUD 2', 'DEMO3', 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`AreaId`) REFERENCES `areas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `historials`
--
ALTER TABLE `historials`
  ADD CONSTRAINT `historials_ibfk_1` FOREIGN KEY (`EmpleadoId`) REFERENCES `empleados` (`id`),
  ADD CONSTRAINT `historials_ibfk_2` FOREIGN KEY (`AreaId`) REFERENCES `areas` (`id`),
  ADD CONSTRAINT `historials_ibfk_3` FOREIGN KEY (`SolicitudId`) REFERENCES `solicituds` (`id`);

--
-- Filtros para la tabla `notificacions`
--
ALTER TABLE `notificacions`
  ADD CONSTRAINT `notificacions_ibfk_1` FOREIGN KEY (`SolicitudId`) REFERENCES `solicituds` (`id`);

--
-- Filtros para la tabla `solicituds`
--
ALTER TABLE `solicituds`
  ADD CONSTRAINT `solicituds_ibfk_1` FOREIGN KEY (`ClienteId`) REFERENCES `clientes` (`id`);

DELIMITER $$
--
-- Eventos
--
DROP EVENT IF EXISTS `historials_days`$$
CREATE DEFINER=`root`@`localhost` EVENT `historials_days` ON SCHEDULE EVERY 1 MINUTE STARTS '2021-08-02 04:02:43' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
  DECLARE hay TINYINT DEFAULT TRUE;
  DECLARE ids INTEGER;
  DECLARE fecha_cur DATETIME;
  DECLARE msg VARCHAR(1000);
  DECLARE existe INT DEFAULT 0;

  DECLARE resultado CURSOR FOR
  SELECT h.SolicitudId AS ids, fecha_max AS fecha, detalle FROM (
    SELECT SolicitudId, min(fecha) as fecha_min
    FROM historials
    GROUP BY SolicitudId 
    ) a NATURAL JOIN ( 
    SELECT SolicitudId, max(fecha) as fecha_max
    FROM historials
    GROUP BY SolicitudId
    ) b INNER JOIN historials h
    ON b.SolicitudId = h.SolicitudId
    AND b.fecha_max = h.fecha
  WHERE TIMESTAMPDIFF(MINUTE, fecha_min, current_time()) > 15*24*60
  AND estado != 'Resuelto';
      
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SELECT 1+1;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET hay = FALSE;
  
  OPEN resultado;
  bucle: LOOP
    IF !hay THEN
      LEAVE bucle;
    END IF;
    FETCH resultado INTO ids, fecha_cur, msg;
    SELECT COUNT(*) INTO existe FROM notificacions
    WHERE SolicitudId = ids AND fecha = fecha_cur;
    IF (existe = 0) THEN
        INSERT INTO notificacions (SolicitudId, fecha, mensaje) VALUES(ids, fecha_cur, CONCAT('15 DAYS EVENT: ', msg));
    END IF;
  END LOOP;
  CLOSE resultado;
END$$

DROP EVENT IF EXISTS `historials_hours`$$
CREATE DEFINER=`root`@`localhost` EVENT `historials_hours` ON SCHEDULE EVERY 1 MINUTE STARTS '2021-08-02 02:43:28' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
  DECLARE hay TINYINT DEFAULT TRUE;
  DECLARE ids INTEGER;
  DECLARE fecha_cur DATETIME;
  DECLARE msg VARCHAR(1000);
  DECLARE existe INT DEFAULT 0;

  DECLARE resultado CURSOR FOR
  SELECT SolicitudId, detalle, fecha FROM (
      SELECT SolicitudId, max(fecha) AS fecha
      FROM help_desk.historials
      GROUP BY SolicitudId
      ) a NATURAL JOIN historials
  WHERE estado != 'Resuelto'
  AND prioridad = 'ALTA'
  AND TIMESTAMPDIFF(MINUTE, fecha, current_timestamp) > 36*60;
      
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SELECT 1+1;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET hay = FALSE;
  
  OPEN resultado;
  bucle: LOOP
    IF !hay THEN
      LEAVE bucle;
    END IF;
    FETCH resultado INTO ids, msg, fecha_cur;
    SELECT COUNT(*) INTO existe FROM notificacions
    WHERE SolicitudId = ids AND fecha = fecha_cur;
    IF (existe = 0) THEN
        INSERT INTO notificacions (SolicitudId, fecha, mensaje) VALUES(ids, fecha_cur, CONCAT('36HS EVENT: ', msg));
    END IF;
  END LOOP;
  CLOSE resultado;
END$$

DROP EVENT IF EXISTS `historials_derivates`$$
CREATE DEFINER=`root`@`localhost` EVENT `historials_derivates` ON SCHEDULE EVERY 1 MINUTE STARTS '2021-08-02 00:04:39' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
  DECLARE hay TINYINT DEFAULT TRUE;
  DECLARE ids INTEGER;
  DECLARE cant INTEGER;
  DECLARE fecha_cur DATETIME;
  DECLARE msg VARCHAR(1000);
  DECLARE existe INT DEFAULT 0;

  DECLARE resultado CURSOR FOR
    SELECT h.SolicitudId, h.detalle, h.fecha, b.cantidad
    FROM historials h NATURAL JOIN
      (SELECT SolicitudId, max(fecha) as fecha
      FROM historials
      GROUP BY SolicitudId) a
    NATURAL JOIN
      (SELECT SolicitudId, count(*) as cantidad
      FROM historials
      WHERE estado = 'Derivado'
      GROUP BY SolicitudId) b;
      
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SELECT 1+1;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET hay = FALSE;
  
  OPEN resultado;
  bucle: LOOP
    IF !hay THEN
      LEAVE bucle;
    END IF;
    FETCH resultado INTO ids, msg, fecha_cur, cant;
      IF (cant > 2) THEN
        BEGIN
            SELECT COUNT(*) INTO existe FROM notificacions
            WHERE SolicitudId = ids AND fecha = fecha_cur;
            IF (existe = 0) THEN
                INSERT INTO notificacions (SolicitudId, fecha, mensaje)
                VALUES(ids, fecha_cur, CONCAT('4 DERIVATES EVENT: ',msg));
            END IF;
        END;
      END IF;
  END LOOP;
  CLOSE resultado;
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
