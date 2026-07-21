
public class FinancialForecast {
    
    public static double forecast(double currentvalue,double  growthrate, int years){
        if(years==0){
            return currentvalue;
        }

        return (1+growthrate)*forecast(currentvalue,growthrate,years-1);


    }


    public static void main(String[] args){
         
        double result=forecast(1000,0.05,5);

        System.out.println("Future value ="+result);
    }

}
