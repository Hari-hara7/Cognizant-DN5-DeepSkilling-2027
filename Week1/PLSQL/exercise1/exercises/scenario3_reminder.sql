SET SERVEROUTPUT ON;

BEGIN

 FOR loan_rec  IN (
    SELECT c.Name,l.LoanID,l.EndDate
    FROM Customers c
    JOIN Loans l 
    on c.CustomerID = l.CustomerID
    where l.EndDate BETWEEN SYSDATE AND  SYSDATE +30

 )

 LOOP

  DBMS_OUTPUT.PUT_LINE('Reminder: Dear ' || loan_rec.Name || ', Loan ID ' || loan_rec.LoanID || 'due on' || TO_CHAR(loan_rec.EndDATE,'DD-MON-YYYY'));

  END LOOP;

  END;

  /