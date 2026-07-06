SET SERVEROUTPUT ON;

BEGIN

   FOR cuts IN (
      SELECT CustomerID, FLOOR(MONTHS_BETWEEN(SYSDATE, DOB)/12) AS Age
      FROM Customers
   ) LOOP
      IF cuts.Age > 60 THEN
         UPDATE Loans
         SET InterestRate = InterestRate - 1
         WHERE CustomerID = cuts.CustomerID;

         DBMS_OUTPUT.PUT_LINE('Discount applied for CustomerID :' || cuts.CustomerID);
      END IF;
   END LOOP;

   COMMIT;

END;
/