package com.library;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.library.repository.BookRepository;
import com.library.service.BookService;

public class LibraryManagementApplication {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		ApplicationContext context =new ClassPathXmlApplicationContext("applicationContext.xml");
		
		BookService service=context.getBean("bookService",BookService.class);
		
		BookRepository repository=context.getBean("bookRepository",BookRepository.class);
		
		service.serviceMethod();
		repository.displayBook();
		
		

	}

}
