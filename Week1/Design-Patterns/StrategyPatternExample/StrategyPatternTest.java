public class StrategyPatternTest {
    
    public static void main(String[] args){
        PaymentContext context = new PaymentContext(new CreditCardPayment());

        context.executePayment(1000);

        context.setStrategy(new PayPalPayment());

        context.executePayment(2000);
    }
}
