
public class SingletonTest {
    public static void main(String[] args){
        Logger logger1 =Logger.getInstance();
        Logger logger2=Logger.getInstance();
        logger1.log("Application started.");
        logger2.log("Multiple Logger instances test.");

        if(logger1==logger2){
            System.out.println("Only one Logger instance exists.");
        }
        else{
            System.out.println("Multiple Logger instances exist");
        }
        System.out.println("Logger1 hashcode: " + logger1.hashCode());
        System.out.println("Logger2 hashcode :"+ logger2.hashCode());

        

    }
}
