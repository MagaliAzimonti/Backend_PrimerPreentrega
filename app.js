const express = require("express");
let app = express();

const { Router } = express;
let router = new Router();

const ProductManager = require("./components/ProductManager");
const path = new ProductManager("productos.json");
const PORT = 3031;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", router);

router.get('/', async (req, res, next) => {
    let stock = await path.getProducts()
    stock.length > 0 ? res.json(stock) : res.send({error: "product not found"})
});

router.get('/', async (req, res) => {
  let stock = await path.getProducts();
  let limit = parseInt(req.query.limit)
  if(limit) {
      let stock = (stock.slice((1, limit)))
      return stock
  } else {
    return res.json({stock})
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    let product = await path.getProductById(req.params.id);
    if (product) {
      res.send({ product });
    } else {
      res.send({ error: "product not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
      let { title, description, price, thumbnail, code, stock, brand } = req.body
      if (title && description && price && thumbnail && code && stock && brand) {
          let newProd = {
            title, 
            description,
            price, 
            thumbnail, 
            code, 
            stock, 
            brand
          };
          await path.save(newProd)
          res.json({ newProd })
      } else {
          res.send({ error: "producto no guardado" })
      }
  } catch (error) {
      console.log(error)
  }
})


let connected_server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
connected_server.on('error', error => console.log(error))