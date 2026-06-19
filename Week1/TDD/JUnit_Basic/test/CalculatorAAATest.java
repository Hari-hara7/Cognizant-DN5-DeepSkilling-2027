import org.junit.Before;
import org.junit.After;
import org.junit.Test;


import static org.junit.Assert.*;

import java.beans.Transient;

public class CalculatorAAATest {

    private Calculator calculator;

    @Before
    public void setup(){
        System.out.println("Before each test");
        calculator = new Calculator();
    }

    @After
    public void teardown(){

        System.out.println("After each test");
    }

    @Test

    public void testAddition(){
        int result=calculator.add(2,3);
        assertEquals(5,result);
    }

    
}
