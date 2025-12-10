import React, { useState, useEffect } from "react";
import "./Admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
  name: "",
  totalQuantity: "",
  quantity: "",
  type: "sheet"
});


  useEffect(() => {
    fetchProducts();
  }, []);

 const fetchProducts = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/product/all`);
  const data = await res.json();

  if (data.success) {
    setProducts(data.products);   // <-- IMPORTANT FIX
  }
};


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/product/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      setFormData({
  name: "",
  totalQuantity: "",
  quantity: "",
  type: "sheet"
});


      fetchProducts();
    } else {
      alert(data.error);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/product/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) fetchProducts();
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>

      <form className="admin-form" onSubmit={handleAddProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
       <input
  type="number"
  name="totalQuantity"
  placeholder="Total Quantity"
  value={formData.totalQuantity}
  onChange={handleInputChange}
  required
/>
<input
  type="number"
  name="quantity"
  placeholder="Available Quantity"
  value={formData.quantity}
  onChange={handleInputChange}
  required
/>
<select
  name="type"
  value={formData.type}
  onChange={handleInputChange}
  required
>
  <option value="sheet">Sheet</option>
  <option value="powertool">Power Tool</option>
</select>

        <button type="submit">Add Product</button>
      </form>

      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <span>{product.name} — {product.totalQuantity}</span>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
