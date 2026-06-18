ALTER TABLE Customers 
ADD IsVIP VARCHAR2(5);

BEGIN
    FOR cuts IN(
        SELECT CustomerID,Balance
        FROM Customers
    )
LOOP
   IF cuts.Balance > 10000 THEN 

    UPDATE Customers
    SET IsVIP = 'YES'
    WHERE CustomerID =cuts.CustomerID;

    END IF;
    END LOOP;

    COMMIT;
    END;

    /