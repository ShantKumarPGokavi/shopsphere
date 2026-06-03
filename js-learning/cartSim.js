// ==========================================
// TASK 1: DEFINE A PRODUCT OBJECT
// ==========================================
// An object groups related data together using key-value pairs.
const product1 = {
    name: "Wireless Headphones",
    price: 4999,
    description: "Noise-canceling over-ear headphones",
    inStock: true
};

// Accessing properties using dot notation
console.log("--- Task 1: Product Details ---");
console.log("Product Name:", product1.name);
console.log("Product Price: ₹", product1.price);


// ==========================================
// TASK 2: CREATE A PRODUCTS ARRAY (CATALOG)
// ==========================================
// An array is an ordered list. We use it to store multiple product objects.
const product2 = {
    name: "Mechanical Keyboard",
    price: 3500,
    description: "RGB backlit tactile keyboard"
};

const product3 = {
    name: "Gaming Mouse",
    price: 1800,
    description: "Wireless ultra-lightweight mouse"
};

// Grouping our objects into a single array
const products = [product1, product2, product3];

console.log("\n--- Task 2: Current Catalog ---");
console.log(products);


// ==========================================
// TASK 3: ADDING AND REMOVING ITEMS
// ==========================================
// .push() adds an item to the end. .pop() removes the last item.
console.log("\n--- Task 3: Testing Array Methods ---");

const product4 = {
    name: "Smart Watch",
    price: 5999,
    description: "Fitness tracker with AMOLED display"
};

// 1. Add product4 to the array
products.push(product4);
console.log("After Pushing New Product (Total items):", products.length);

// 2. Remove the last item from the array
products.pop();
console.log("After Popping (Total items back to):", products.length);
