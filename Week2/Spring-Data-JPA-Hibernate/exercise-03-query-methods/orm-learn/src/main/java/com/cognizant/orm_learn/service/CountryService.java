package com.cognizant.orm_learn.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.repository.CountryRepository;

@Service
public class CountryService {

    @Autowired
    private CountryRepository repository;

    @Transactional
    public List<Country> searchCountry(String text) {

        return repository.findByNameContaining(text);

    }

    @Transactional
    public List<Country> searchCountrySorted(String text) {

        return repository.findByNameContainingOrderByNameAsc(text);

    }

    @Transactional
    public List<Country> searchCountryStarting(String alphabet) {

        return repository.findByNameStartingWith(alphabet);

    }

}