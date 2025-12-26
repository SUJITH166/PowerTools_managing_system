import React, { useState, useEffect } from "react";
import "./SheetShop.css";
import Modal from "../Modal/Modal";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCard from "../SkeletonCard/SkeletonCard";

const SheetShop = () => {
  const [sheetJacky, setSheetJacky] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading,setIsLoading]=useState(true)

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/product/type/sheet`);
    const data = await res.json();

    if (data.success) {
      setSheetJacky(data.products); // IMPORTANT FIX
      setIsLoading(false);
    } else {
      setSheetJacky([]); // fallback
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    items: [
      { product: "", quantity: "" }
    ],
  });

  const handleclickAdd = () => setShowModel(true);
  const handleClose = () => setShowModel(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const update = [...formData.items];
    update[index][e.target.name] = e.target.value;
    setFormData({ ...formData, items: update });
  };

  const handleAddMore = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: "", quantity: "" }]
    });
  };

  const handleRemoveItem = (index) => {
    const updated = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // phone validation
    if (!/^\d{10}$/.test(formData.number)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/sheet/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setShowModel(false);
      setShowPopup(true);
      fetchProducts();
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div className="sheetshop-main">
      {showPopup && <div className="popup-class">Saved Successfully ✔</div>}

      <h2>Total</h2>

      <div className="sheetshop-container">
        {isLoading&&
        <div className="sheetshop-total-s"><SkeletonCard card={6}/></div>}
        
        {sheetJacky.map((item) => (
          <div key={item._id} className="sheetshop-total">
            <span>{item.name||<Skeleton/>}</span>
            <span>
              {item.quantity||<Skeleton/>}/{item.totalQuantity||<Skeleton/>}
            </span>
          </div>
        ))}

        <button className="sheetshop-btn" onClick={handleclickAdd}>
          Add
        </button>
      </div>

      {showModel && (
        <Modal onClose={handleClose}>
          <h2>Add Sheet/Jacky Entry</h2>

          <form className="sheet-form" onSubmit={handleSubmit}>
            <input
              className="sheet-form-in"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <input
              className="sheet-form-in"
              type="text"
              placeholder="Phone"
              name="number"
              value={formData.number}
              onChange={(e) => {
                const value = e.target.value;
                if (!/^\d*$/.test(value)) return;
                if (value.length > 10) return;
                setFormData({ ...formData, number: value });
              }}
              required
            />

            {formData.items.map((item, index) => (
              <div key={index} className="product-row">
                <select
                  className="sheet-option"
                  name="product"
                  value={item.product}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                >
                  <option value="">Select</option>

                  {sheetJacky.map((p) => (
                    <option key={p._id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <input
                  className="sheet-option"
                  type="number"
                  name="quantity"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />

                {formData.items.length > 1 && (
                  <button
                    type="button"
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}

            <button type="button" className="add-more" onClick={handleAddMore}>
              + More
            </button>

            <div className="button-row">
              <button type="button" className="close-btn" onClick={handleClose}>
                Close
              </button>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SheetShop;
