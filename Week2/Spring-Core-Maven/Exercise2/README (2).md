# Spring Bean Retrieval with ApplicationContext

## Objective
Learn how Spring creates and manages beans using an XML configuration file and how to retrieve them from the Spring IoC container.

## Key Concepts

### 1. ApplicationContext
`ApplicationContext` is Spring's IoC (Inversion of Control) container.

Example:

```java
ApplicationContext context =
    new ClassPathXmlApplicationContext("applicationContext.xml");
```

What it does:
- Loads `applicationContext.xml`
- Creates and manages beans defined in the file
- Resolves dependencies between beans
- Makes beans available through `getBean()`

---

### 2. Defining a Bean

Example `applicationContext.xml`:

```xml
<bean id="bookservice"
      class="com.library.BookService"/>
```

Spring creates an instance of `BookService` and stores it in the container.

---

### 3. Retrieving a Bean

```java
BookService service =
    context.getBean("bookservice", BookService.class);
```

What happens:
- Spring searches for a bean with id `bookservice`
- Returns the bean as a `BookService` object
- Throws an exception if the bean does not exist

Equivalent without Spring:

```java
BookService service = new BookService();
```

---

### 4. Common Error

Exception:

```text
NoSuchBeanDefinitionException:
No bean named 'bookservice' available
```

Possible causes:

#### Bean not defined

```xml
<bean id="bookservice"
      class="com.library.BookService"/>
```

is missing.

#### Wrong bean name

Bean names are case-sensitive.

Example:

```xml
<bean id="bookService"
      class="com.library.BookService"/>
```

Correct retrieval:

```java
context.getBean("bookService", BookService.class);
```

Incorrect retrieval:

```java
context.getBean("bookservice", BookService.class);
```

#### Component scanning not enabled

If using annotations:

```java
@Service
public class BookService {
}
```

Spring must scan the package.

---

### 5. Dependency Injection vs Object Creation

Without Dependency Injection:

```java
BookService service = new BookService();
```

With Dependency Injection:

```java
BookService service =
    context.getBean("bookservice", BookService.class);
```

Benefits:
- Loose coupling
- Easier testing
- Centralized object management
- Better maintainability

---

### 6. Debugging Beans

Print all loaded beans:

```java
String[] beans = context.getBeanDefinitionNames();

for (String bean : beans) {
    System.out.println(bean);
}
```

Useful for checking whether Spring has created the expected bean.

---

## Conclusion

This exercise demonstrates:
1. Loading a Spring container using `ClassPathXmlApplicationContext`.
2. Defining beans in `applicationContext.xml`.
3. Retrieving beans using `getBean()`.
4. Understanding `NoSuchBeanDefinitionException` and its causes.
5. Comparing Dependency Injection with manual object creation.

In modern Spring Boot applications, constructor injection is preferred, and direct calls to `ApplicationContext.getBean()` are used less frequently.


---

## 7. Dependency Injection Example (Setter Injection)

### BookService

```java
package com.library.service;

import com.library.repository.BookRepository;

public class BookService {

    private BookRepository bookRepository;

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void displayService() {
        System.out.println("Book service is working");
        bookRepository.displayBook();
    }
}
```

### BookRepository

```java
package com.library.repository;

public class BookRepository {

    public void displayBook() {
        System.out.println("Book Repository is working");
    }
}
```

### XML Configuration

```xml
<bean id="bookRepository"
      class="com.library.repository.BookRepository"/>

<bean id="bookservice"
      class="com.library.service.BookService">
    <property name="bookRepository"
              ref="bookRepository"/>
</bean>
```

### How Dependency Injection Works

1. Spring creates the `bookRepository` bean.
2. Spring creates the `bookservice` bean.
3. Spring calls:

```java
bookService.setBookRepository(bookRepository);
```

4. The dependency is injected automatically by the Spring container.
5. When `displayService()` is called, it can safely use the repository object.

### Running the Application

```java
ApplicationContext context =
    new ClassPathXmlApplicationContext("applicationContext.xml");

BookService service =
    context.getBean("bookservice", BookService.class);

service.displayService();
```

### Expected Output

```text
Book service is working
Book Repository is working
```

### Why This Is Dependency Injection

Without DI:

```java
private BookRepository bookRepository =
        new BookRepository();
```

With DI:

```java
<property name="bookRepository"
          ref="bookRepository"/>
```

The `BookService` class does not create the repository itself. Spring creates and injects it, resulting in loose coupling and easier maintenance.
