const fs = require('fs/promises');
const { existsSync } = require('fs');

class ManagerProducts {
  static idCounter = 0;

  constructor(path) {
    this.path = path;
  }
  async readFile() {
    const text = await fs.readFile(this.path, 'utf-8');
    const data = JSON.parse(text);
    return data;
  }

  async writeFile(data){
    const dataStr = JSON.stringify(data, null, '\t');
    await fs.writeFile(this.path, dataStr); 
  }


  // addProducts
  async addProducts(product) {
    const products = await this.getProducts();
    if (!products.length)  {
      ManagerProducts.idCounter = 1;
    } else {
      ManagerProducts.idCounter = products[products.length - 1].id + 1;
    }
    const newProduct = {
      id: ManagerProducts.idCounter,
      ...product
    };
    products.push(newProduct);
    await this.writeFile(products);
    return newProduct;
  }

  // getProducts
  async getProducts() {
    if (existsSync(this.path)) {
      return await this.readFile();
    } else {
      return [];
    }
  }

  // getProductById
  async getProductById(idProduct) {
    try{
      const products = await this.getProducts();
      const foundProduct = products.find((prod) => prod.id === idProduct);
      return foundProduct;
    } catch (error){
      console.log(error.message)
    }
  } 

  // updateProduct
  async updateProduct(idProduct, newProperties) {
    const products = await this.getProducts();
    const foundProduct = await this.getProductById(idProduct);
    const productUpdated = {...foundProduct, ...newProperties}
    const updatedList = products.map(elem=>{
      if(elem.id===productUpdated.id){
        return productUpdated
      }else{
        return elem
      }
    })
    await this.writeFile(updatedList);
    return productUpdated;
  }


  // deleteProduct
  async deleteProduct(idProduct) {
        if (existsSync(this.path)) {
        const products = await this.readFile();
        const prodDeleted = products.filter((prod) => prod.id !== idProduct) 
          if (prodDeleted) {
          await this.writeFile(prodDeleted);
          return prodDeleted;
        }
    } else {
        return [];
    }
  }
  

}

module.exports = ManagerProducts;
