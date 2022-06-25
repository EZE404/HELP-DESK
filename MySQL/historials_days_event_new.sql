CREATE EVENT 'historials_days' ON SCHEDULE EVERY 1 MINUTE STARTS '2021-08-02 04:02:43.000' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
DECLARE hay TINYINT DEFAULT TRUE;
DECLARE ids INTEGER;
DECLARE fecha_cur DATETIME;
DECLARE msg VARCHAR(1000);
DECLARE existe INT DEFAULT 0;
DECLARE resultado CURSOR FOR
SELECT h.SolicitudId AS ids,
  fecha_max AS fecha,
  detalle
FROM (
    SELECT SolicitudId,
      min(fecha) as fecha_min
    FROM historials
    GROUP BY SolicitudId
  ) a
  NATURAL JOIN (
    SELECT SolicitudId,
      max(fecha) as fecha_max
    FROM historials
    GROUP BY SolicitudId
  ) b
  INNER JOIN historials h ON b.SolicitudId = h.SolicitudId
  AND b.fecha_max = h.fecha
WHERE TIMESTAMPDIFF(MINUTE, fecha_min, current_time()) > 15 * 24 * 60
  AND estado != 'Resuelto';
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
SELECT 1 + 1;
DECLARE CONTINUE HANDLER FOR NOT FOUND
SET hay = FALSE;
OPEN resultado;
bucle: LOOP IF ! hay THEN LEAVE bucle;
END IF;
FETCH resultado INTO ids,
fecha_cur,
msg;
SELECT COUNT(*) INTO existe
FROM notificacions
WHERE SolicitudId = ids
  AND fecha = fecha_cur;
IF (existe = 0) THEN
INSERT INTO notificacions (SolicitudId, fecha, mensaje)
VALUES(ids, fecha_cur, CONCAT('15 DAYS EVENT: ', msg));
END IF;
END LOOP;
CLOSE resultado;
END