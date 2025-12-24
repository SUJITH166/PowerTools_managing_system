import { useState, useEffect } from "react";

const AdminProducts = () => {
  const token = localStorage.getItem("adminToken");
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(""); // renamed from quantity to total
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
      body: JSON.stringify({ name, total: Number(total), type }) // send total
    });

    const data = await res.json();
    if (data.success) {
      setProducts(prev => [...prev, data.product]);
      setName("");
      setTotal("");
      setType("sheet");
    } else {
      alert("Error adding product: " + data.error);
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
    <div className="main-wrapper">
      <h2>Admin Products</h2>

      <input
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Total Stock"
        value={total}
        type="number"
        onChange={e => setTotal(e.target.value)}
      />

      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="sheet">Sheet</option>
        <option value="powertool">PowerTool</option>
      </select>

      <button onClick={handleAdd}>Add Product</button>

      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} — qty: {p.quantity} / total: {p.total} ({p.type})
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
