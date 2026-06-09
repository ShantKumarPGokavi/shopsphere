
// ==========================================
// 1. PRODUCT DATABASE (Catalog)
// ==========================================

const PRODUCTS = [
   {id : 101, title : "Alpha Gaming Shoes", price : 4000, stock : 4},
   {id : 102, title : "Wireless Ergonomic Mouse", price : 1500, stock : 0},
   {id : 103, title : "Mechanical RGB Keyboard", price : 2800, stock : 3},
   {id : 104, title : "Premium Bass Headphones", price : 5000, stock : 7}
];


// ==========================================
// 2. USER CART SYSTEM (Empty initially)
// ==========================================

let userCart = [];
// Function to simulate a user clicking "Add to Cart"
function addTocart(productID){
    //Use .find() to locate the product in our database matching id
    const product = PRODUCTS.find(function(Item){
        return Item.id === productID;
    });

    if(product && product.stock > 0){
        userCart.push(product);
        console.log("🛒 Added to cart: ${product.title}");
    }
    else{
       console.log("❌ Cannot add item ${productId}: Out of stock or invalid!");
        }
    }

 // ==========================================
 // 3. ASYNCHRONOUS CHECKOUT ENGINE
 // ==========================================

 function simulatePaymentGateway(){
    return new Promise(function(resolve){
        setTimeout(function (){
          resolve("PAYMENT_SUCCESS_TOKEN");
        }, 2000);
    });
 }

 async function processCheckout(){
    console.log("\n--- Starting CheckingOut Process ---");

    if(userCart.length === 0){
        console.log("Checkout aborted...Your Cart is empty!!!");
        return;
    }
   
     //Calculate the total pricing
     let subTotal = 0;
     for(const item of userCart){
        subTotal += item.price;
     }

     const tax = subTotal * 0.18;
     const finalAmount = subTotal + tax;

    console.log(`Subtotal: ₹${subTotal}`);
    console.log(`GST (18%): ₹${tax}`);
    console.log(`Total Payable Amount: ₹${finalAmount}`);
    console.log("Connecting to secured payment gateway... Please do not refresh.");

    const transactionStatus = await simulatePaymentGateway();

    console.log(`✅ Payment Received! Transaction ID: ${transactionStatus}`);
    console.log("🛍️ Order placed successfully! Thank you for shopping at Shopsphere.");

    userCart = [];
    
 }
  
// ==========================================
// 4. EXECUTION FLOW (Simulating User Actions)
// ==========================================
   addTocart(101);
   addTocart(102);
   addTocart(103);

 processCheckout();