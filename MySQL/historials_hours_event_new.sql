CREATE DEFINER=`root`@`localhost` EVENT `historials_hours`
	ON SCHEDULE
		EVERY 1 MINUTE STARTS '2021-08-02 02:43:28'
	ON COMPLETION PRESERVE
	ENABLE
	COMMENT 'solicitud con 36hs sin movimientos'
	DO BEGIN
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
      ) a NATURAL JOIN historials hls
      INNER JOIN solicituds sds ON hls.SolicitudId = sds.id
  WHERE estado != 'Solucionado'
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
    WHERE SolicitudId = ids AND fecha = fecha_cur AND tipo = "36hs inactiva";
    IF (existe = 0) THEN
        INSERT INTO notificacions (SolicitudId, fecha, mensaje, tipo) VALUES(ids, fecha_cur, msg, "36hs inactiva");
    END IF;
  END LOOP;
  CLOSE resultado;
END