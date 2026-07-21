package com.cognizant.spring_learn.service;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.cognizant.spring_learn.Country;

@Service
public class CountryService {
    
    public Country getCountry(String code) {

        ApplicationContext context=new ClassPathXmlApplicationContext("country.xml");

    List<Country> countries=context.getBean("countryList",List.class);

    for(Country country:countries){
        if(country.getCode().equalsIgnoreCase(code)){
  return country;


        }  }
        return null;



    }  
}
