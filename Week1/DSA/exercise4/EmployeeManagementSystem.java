public class EmployeeManagementSystem {
    private Employee[] employees;
    private int count;

    public EmployeeManagementSystem(int size){
        employees=new Employee[size];
        count=0;
    }


    public void addEmployee(Employee employee){
        if(count<employees.length){
            employees[count]=employee;
            count++;
            System.out.println("Employee added Successfully");
        }
        else{
            System.out.println("Array is full");
        }

    }

    public Employee searchEmployee(int id){

        for(int i=0;i<count;i++){
            if(employees[i].employeeId==id){
                return employees[i];
            }
        }

        return null;
    }

    public void displayEmployees(){
        System.out.println("\nEmployee Records");

        for(int i=0;i<count;i++){
            System.out.println(employees[i]);
        }
    }


    public void deleteEmployee(int id){

        int index=-1;

        for(int i=0;i<count;i++){

            if(employees[i].employeeId==id){
                index=i;
                break;
            }
        }


        if(index==-1){
            System.out.println("Employee not found");
            return ;
        }

        for(int i=index;i<count-1;i++){
            employees[i]=employees[i+1];
        }

        employees[count-1]=null;
        count--;
        System.out.println("Employee Deleted Successfullly");



    }


    public static void main(String[] args){


        EmployeeManagementSystem ems=new EmployeeManagementSystem(10);

        ems.addEmployee(new Employee(101,"Hari","Developer",50000));

        ems.addEmployee(new Employee(102,"test","Developer",60000));

      ems.addEmployee(new Employee(103,"test7","Developer",70000));

       ems.displayEmployees();
      
       Employee emp=ems.searchEmployee(101);

       if(emp!=null){
        System.out.println(emp);
       }
       else{
        System.out.println("Employee Not found");
       }

       System.out.println("Deleting Employee");

       ems.deleteEmployee(102);
       ems.displayEmployees();

    }

}