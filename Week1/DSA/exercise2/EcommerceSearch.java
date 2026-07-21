import java.util.Arrays;
import java.util.Comparator;

class Product {
    int productId;
    String productName;
    String category;

    public  Product(int productId,String productName,String category){
        this.productId=productId;
        this.productName=productName;
        this.category=category;
    }


    @Override
    public String toString() {
        return "ProductId: " + productId + " Name: " + productName + " Category: " + category;
    }

}

public class EcommerceSearch {
    
        
        public static Product linearSearch(Product[] products, String targetName){
            for(Product product:products){
                if(product.productName.equals(targetName)){
                    return product;
                }
            }
            return null;
        }

        public static Product binarySearch(Product[] products,String targetName){

            int left=0;
            int right=products.length-1;

            while(left<=right){
                int mid=left+(right-left)/2;

                int comparison=products[mid].productName.compareToIgnoreCase(targetName);


                if(comparison==0){
                    return products[mid];
                }
                else if(comparison<0){
                    left=mid+1;
                }
                else{
                   right=mid-1;
                }
                }

                return null;
            
        }


        public static void main(String[] args){

            Product[] products={
                new Product(1,"Laptop","Electronics"),
                new Product(2,"Mobile","Electronics"),
                new Product(3,"Shirt","Clothing"),
                new Product(4,"Shoes","Footwear"),
                new Product(5,"Watch","Accessories")
            };


             Product result1=linearSearch(products,"Mobile");
             System.out.println("Linear Search");
             if(result1!=null){
                System.out.println(result1);

             }
             else{
                System.out.println("Product Not Found");
             }


             Arrays.sort(products,Comparator.comparing(p->p.productName));

             Product result2=binarySearch(products,"Shoes");

             System.out.println("Binary Search");

             if(result2!=null){
                System.out.println(result2);
             }
             else{
                System.out.println("Product Not Found");
             }

        }

    
}



