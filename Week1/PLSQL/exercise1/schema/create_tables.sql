create table customers (
    CustomerID number primary key,
    Name varchar2(100),
    DOB date,
    Balance number,
    last_modified date
);


create table loans (

    LoanID Number primary key,
    CustomerID number,
    LoanAmount number,
    InterestRate number,
    StartDate date,
    EndDate date,
);