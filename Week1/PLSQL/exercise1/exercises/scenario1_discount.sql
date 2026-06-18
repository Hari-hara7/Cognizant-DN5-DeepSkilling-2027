SET SERVEROUTPUT ON;

DECLARE
BEGIN

 FOR cuts IN(

    SELECT CustomerID,FLOOR(MONTHS_BETWEEN(SYSDATE,DOB)/12) AS Age
    From Customers
 )

 LOOP
  IF cuts.Age > 60 THEN 
  UPADTE Loans
  SET InterestRate = InterestRate -1;

  WHERE CustomerID = cuts.CustomerID;

  DBMS_OUTPUT.PUT_LINE('Discount applied for CustomerID :' || cust.CustomerID);

  );

  END IF;
  END LOOP; 
  COMMIT;

  END;

  /