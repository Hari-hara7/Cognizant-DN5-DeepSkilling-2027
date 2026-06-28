package com.cognizant.orm_learn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.cognizant.orm_learn.service.EmployeeService;

@SpringBootApplication
public class OrmLearnApplication {

    public static void main(String[] args) {

        ApplicationContext context=
                SpringApplication.run(
                        OrmLearnApplication.class,
                        args);

        EmployeeService service=
                context.getBean(EmployeeService.class);

        service.getEmployees()
               .forEach(System.out::println);

    }

}