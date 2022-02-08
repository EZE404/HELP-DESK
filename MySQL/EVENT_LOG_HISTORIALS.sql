CREATE EVENT historials_derivates
ON SCHEDULE EVERY 1 MINUTE
STARTS '2021-08-02 00:04:39.000'
ON COMPLETION NOT PRESERVE
ENABLE
DO BEGIN
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
      IF (cant>2) THEN
        BEGIN
            SELECT COUNT(*) INTO existe FROM notificacions
            WHERE SolicitudId = ids AND fecha = fecha_cur;
            IF (existe > 0) THEN
                INSERT INTO notificacions (SolicitudId, fecha, mensaje) VALUES(ids, fecha_cur, fecha_cur);
            END IF;
        END;
      END IF;
  END LOOP;
  CLOSE resultado;
END