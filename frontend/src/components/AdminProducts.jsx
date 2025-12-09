import { useState, useEffect } from "react";

const AdminProducts = () => {
  const token = localStorage.getItem("adminToken");
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("sheet");

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, [token]);

  const handleAdd = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ name, quantity: Number(quantity), type })
    });
    const data = await res.json();
    if (data.success) {
      setProducts(prev => [...prev, data.product]);
      setName(""); setQuantity(""); setType("sheet");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    });
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div>
      <h2>Admin Products</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Quantity" value={quantity} type="number" onChange={e => setQuantity(e.target.value)} />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="sheet">Sheet</option>
        <option value="powertool">PowerTool</option>
      </select>
      <button onClick={handleAdd}>Add Product</button>

      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - {p.quantity} ({p.type})
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
