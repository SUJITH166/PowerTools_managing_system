import React, { useState } from "react";
import "./SheetShop.css";
import Modal from "../Modal/Modal";
const SheetShop = () => {
  const [sheetJacky, setSheetJacky] = useState([
    { id: 1, name: "Sheet", quantity: 100, total: 150 },
    { id: 2, name: "Jackey", quantity: 100, total: 150 },
    { id: 3, name: "Adjustable(B)", quantity: 100, total: 150 },
    { id: 4, name: "Adjustable(s)", quantity: 100, total: 150 },
  ]);
  const [showModel, setShowModel] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    items: [
      {
        product: "",
        quantity: "",
      },
    ],
  });
  const handleclickAdd = () => {
    setShowModel(true);
  };
  const handleClose = () => {
    setShowModel(false);
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleItemChange = (index, e) => {
    const updateItems = [...formData.items];
    updateItems[index][e.target.name] = e.target.value;
    setFormData({ ...formData, items: updateItems });
  };
  const handleAddMore = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: "", quantity: "" }],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data", formData);
    setShowModel(false);
  };

  const handleRemoveItem = (index) => {
    const filterItem = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: filterItem });
  };
  return (
    <div className="sheetshop-main">
      <h2>Total</h2>
      <div className="sheetshop-container">
        {sheetJacky.map((item) => (
          <div key={item.id} className="sheetshop-total">
            <span>{item.name}</span>
            <span>
              {item.quantity}/{item.total}
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
              type="number"
              placeholder="Phone"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
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
                    <option key={p.id} value={p.name}>
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
