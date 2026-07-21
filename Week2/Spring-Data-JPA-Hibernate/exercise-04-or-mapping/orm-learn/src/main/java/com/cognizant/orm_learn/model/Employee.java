package com.cognizant.orm_learn.model;

import jakarta.persistence.*;

@Entity
@Table(name="employee")
public class Employee {

    @Id
    @Column(name="emp_id")
    private int id;

    @Column(name="emp_name")
    private String name;

    @OneToOne
    @JoinColumn(name="department_id")
    private Department department;

    public Employee() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id=id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name=name;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department=department;
    }

    @Override
    public String toString() {

        return id+" "+name+" "+department;

    }

}