package com.cognizant;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.*;

class Exercise1Test {

	@Test
	void testExternalApi() {
		
		ExternalApi mockApi=mock(ExternalApi.class);
		
		when(mockApi.getData()).thenReturn("Mock Data");
		
		
		MyService service=new MyService(mockApi);
		
        String result=service.fetchData();
        
        assertEquals("Mock Data",result);
	}

}
