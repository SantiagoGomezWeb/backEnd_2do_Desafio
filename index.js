const ManagerProducts = require('./managers/ManagerProducts');

const manager = new ManagerProducts('./data/Products.json');

const productsManager = async () => {
  try {
    
    console.log("**** First Query ****");
    let products = await manager.getProducts();
    console.log(products);

    console.log("**** Add Prod 1 ****");
    const newProduct1 = {
      title: "Cerveza IPA", 
      description: "Elaborada con Sauco de Bariloche", 
      price: 580, 
      thumbnail: "", 
      code: "CERV0001", 
      stock: 50 
    };
    const product1Result = await manager.addProducts(newProduct1);
    console.log(product1Result);

    console.log("**** Add Prod 2 ****");
    const newProduct2 = {
      title: "Alambrado Malbec", 
      description: "Vino Tinto de Altura", 
      price: 3100, 
      thumbnail: "", 
      code: "MALB0001", 
      stock: 10 
    };
    const product2Result = await manager.addProducts(newProduct2);
    console.log(product2Result);    


    console.log("**** Add Prod 3 ****");
    const newProduct3 = {
      title: "Sidra Rex", 
      description: "Sidra para Navidad", 
      price: 700, 
      thumbnail: "", 
      code: "SID0001",
      stock: 100 
    };
    const product3Result = await manager.addProducts(newProduct3);
    console.log(product3Result);    


    console.log("**** Second Query ****");
    products = await manager.getProducts();
    console.log(products);

    console.log("**** getProductById");
    products = await manager.getProductById(2);
    products ? console.log(products) : console.log("Product Not Found")

    console.log("**** updateProduct ****");
    products = await manager.updateProduct(3,{price:78900});
    console.log(products);

    console.log("**** deleteProduct ****");
    products = await manager.deleteProduct(2);
    products ? console.log(products) : console.log("Product Not Found")

  }
  catch(error) {
    console.log(error);
  }
} 

productsManager();