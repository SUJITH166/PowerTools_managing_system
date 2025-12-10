import { useState, useEffect } from "react";
import "./AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("sheet");

  // Your backend URL (localhost or Render)
  

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const addProduct = async () => {
    const body = { name, quantity, type };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setProducts([...products, data]); // update UI
    setName("");
    setQuantity("");
  };

  const deleteProduct = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel - Manage Products</h2>

      <div className="form-box">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="sheet">Sheet</option>
          <option value="item">PowerTools</option>
        </select>

        <button onClick={addProduct}>Add Product</button>
      </div>

      <div className="product-list">
        <h3>Products</h3>
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <p>
              <strong>{p.name}</strong> — {p.quantity} pcs ({p.type})
            </p>
            <button className="delete-btn" onClick={() => deleteProduct(p._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
