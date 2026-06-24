package com.cognizant.orm_learn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.ApplicationContext;

import com.cognizant.orm_learn.service.CountryService;

@SpringBootApplication
public class OrmLearnApplication {

	public static void main(String[] args) {
		
		ApplicationContext context=SpringApplication.run(OrmLearnApplication.class, args);

		CountryService service=context.getBean(CountryService.class);

		service.getAllCountries().forEach(System.out::println);


	}

}
