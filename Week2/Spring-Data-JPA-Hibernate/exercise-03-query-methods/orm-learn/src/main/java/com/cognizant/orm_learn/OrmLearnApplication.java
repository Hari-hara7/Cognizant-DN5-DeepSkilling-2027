package com.cognizant.orm_learn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.cognizant.orm_learn.service.CountryService;

@SpringBootApplication
public class OrmLearnApplication {

    public static void main(String[] args) {

        ApplicationContext context =
                SpringApplication.run(
                        OrmLearnApplication.class,
                        args);

        CountryService service =
                context.getBean(CountryService.class);

        System.out.println("---------------");
        System.out.println("Search : ou");
        System.out.println("---------------");

        service.searchCountry("ou")
               .forEach(System.out::println);

        System.out.println();

        System.out.println("---------------");
        System.out.println("Sorted Search");
        System.out.println("---------------");

        service.searchCountrySorted("ou")
               .forEach(System.out::println);

        System.out.println();

        System.out.println("---------------");
        System.out.println("Starts With Z");
        System.out.println("---------------");

        service.searchCountryStarting("Z")
               .forEach(System.out::println);

    }

}