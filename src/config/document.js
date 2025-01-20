export const documentApi = `
<div style="background-color: #f0f9f4; font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
    <header style="text-align: center; margin-bottom: 20px;">
    <h1 style="color: #2c6e49;">API Documentation</h1>
    <p style="font-size: 1.2em; color: #4f4f4f;">Base URL: <code style="background-color: #e8f5e9; padding: 3px 6px; border-radius: 3px;">https://yayraserver-production.up.railway.app/api</code></p>
  </header>

  <section style="margin-bottom: 30px;">
    <h2 style="color: #2c6e49;">Categories</h2>

    <div style="margin-bottom: 15px;">
      <h3 style="color: #387a4e;">GET 
        <a href="api/categories/get">/categories/get</a>
      </h3>
      <p>Returns a list of all categories.</p>
      <pre style="background-color: #e8f5e9; padding: 10px; border-radius: 5px;">
[
  {
    "id": 1,
    "name": "Electronics",
    "description": "All kinds of electronic gadgets."
    "image" : "image-url.png" 
  },
  {
    "id": 2,
    "name": "Clothing",
    "description": "Men's and women's clothing."
    "image" : "image-url.png" 
  }
]
      </pre>
    </div>

    <div style="margin-bottom: 15px;">
      <h3 style="color: #387a4e;">GET 
        <a href="api/categories/get-one/:id">/categories/get-one/:id</a>
      </h3>
      <p>Returns information about a specific category by ID.</p>
      <pre style="background-color: #e8f5e9; padding: 10px; border-radius: 5px;">
{
  "id": 1,
  "name": "Electronics",
  "description": "All kinds of electronic gadgets."
  "image" : "image-url.png"
}
      </pre>
    </div>
  </section>
    <hr>
  <section style="margin-bottom: 30px;">
    <h2 style="color: #2c6e49;">Products</h2>

    <div style="margin-bottom: 15px;">
      <h3 style="color: #387a4e;">GET 
        <a href="api/products/get">/products/get</a>
      </h3>
      <p>Returns a list of all products.</p>
      <pre style="background-color: #e8f5e9; padding: 10px; border-radius: 5px;">
[
  {
    "id": 101,
    "name": "Smartphone",
    "description": "Latest 5G smartphone."
    "image" : "image-url.png"
    "price": 499.99,
    "rate" : 4.5
    "categoryId": 1,
  },
  {
    "id": 102,
    "name": "Laptop",
    "description": "High-performance laptop."
    "image" : "image-url.png"
    "price": 999.99,
    "rate" : 5,
    "categoryId": 1,
  }
]
      </pre>
    </div>

    <div style="margin-bottom: 15px;">
      <h3 style="color: #387a4e;">GET 
        <a href="api/products/get-one/:id">/products/get-one/:id</a>
      </h3>
      <p>Returns information about a specific product by ID.</p>
      <pre style="background-color: #e8f5e9; padding: 10px; border-radius: 5px;">
{
    "id": 101,
    "name": "Smartphone",
    "description": "Latest 5G smartphone."
    "image" : "image-url.png"
    "price": 499.99,
    "rate" : 4.5
    "categoryId": 1,
  }
      </pre>
    </div>
  </section>

</div>

`