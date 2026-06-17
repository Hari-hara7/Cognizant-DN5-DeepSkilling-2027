public class Employee {
    int employeeId;
    String name;
    String Position;
    double salary;

    public Employee(int employeeId,String name,String Position,double salary){
        this.employeeId=employeeId;
        this.name=name;
        this.Position=Position;
        this.salary=salary;
    }

    @Override
    public String toString(){

        return "ID : "+employeeId+", Name : "+name+", Position :"+Position+" salary :"+salary;
    }
}