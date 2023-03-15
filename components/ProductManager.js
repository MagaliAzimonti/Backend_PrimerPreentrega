const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async writeFile(datos) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(datos, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      let stock = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(stock);
    } catch (error) {
      console.log(error, "No hay datos en el archivo");
      return [];
    } 
  }

  async addProduct(obj) {
    let stock = await this.getProducts();
    try {
      if (stock.length == 0) {
        obj.id = 1;
      } else {
        obj.id = stock[stock.length - 1].id + 1;
      }
      stock.push(obj);
      await this.writeFile(stock);
      console.log(`Se ha añadido correctamente ${JSON.stringify(obj)}`);
    } catch (error) {
      console.log(error, "No se ha guardado correctamente");
    }
  }

  async getProductById(id) {
    try {
      const stock = await this.getProducts();
      const data = stock;
      return data.find((producto) => producto.id === parseInt(id));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      let stock = await this.getProducts();
      stock = stock.filter((prod) => prod.id != id);
      await this.writeFile(stock);
      console.log(`Se ha eliminado el producto ${JSON.stringify(stock)}`);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    await this.writeFile([]);
    console.log(
      `Se han eliminado todos los productos del archivo: ${this.path}`
    );
  }

  async updateById(obj) {
    try {
      let stock = await this.getProducts();
      stock.map((prod) => {
        if (prod.id == obj.id) {
          (prod.title = obj.title),
            (prod.description = obj.description),
            (prod.price = obj.price),
            (prod.thumbnail = obj.thumbnail),
            (prod.code = obj.code),
            (prod.stock = obj.stock),
            (prod.brand = obj.brand);
        }
      });
      await this.writeFile(stock);
      return stock;
    } catch (error) {
      console.log(error);
    }
  }

  async save(obj) {
    let stock = await this.getProducts();
    if (stock.length === 0) {
        obj.id = 1

    } else {
        obj.id = stock[stock.length - 1].id + 1

    }
    try {
        stock.push(obj)
        await this.writeFile(stock)
        console.log(`Se ha añadido correctamente ${JSON.stringify(obj)}`)

    } catch (error) {
        console.log(error, "No se ha guardado correctamente")
    }
}
}

module.exports = ProductManager;