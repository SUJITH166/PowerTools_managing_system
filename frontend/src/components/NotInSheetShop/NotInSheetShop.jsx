import React, { useEffect, useState } from "react";
import "./NotInSheetShop.css"; // ⬅ import CSS file
import Modal from "../Modal/Modal";

const NotInSheetShop = () => {
  const [entries, setEntries] = useState([]);
  const [openEntry, setOpenEntry] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/sheet/all`)
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  const formatDate = (iso) => {
    const date = new Date(iso);

    return {
      date: date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };
  const handleDropDown = (id) => {
    setOpenEntry(openEntry === id ? null : id);
  };
  const itemRemove = (id) => {
    setDeleteId(id);
    setConfirm(true);
  };

  const removeConfirm = async (deleteId) => {
     setDeleting(true);
     try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/sheet/${deleteId}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
    setEntries(entries.filter((entry) => entry._id !== deleteId));
    alert("Deleted Successfully");
    }
  }catch(err){
    console.error(err);
    alert("Error deleting item");
  }
  setDeleting(false);
    setConfirm(false);
    setDeleteId(null);
  };

  const handleCloseModel = () => {
    setConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="notin-container">
      <h2 className="title">Sheet/Jacky Entries</h2>

      {entries.map((entry) => {
        const formatted = formatDate(entry.date);
        return (
          <div key={entry._id} className="entry-card">
            <div className="entry-top">
              <div className="entry-info">
                <div className="date-block">
                  <span className="entry-date">{formatted.date}</span>
                  <span className="entry-time">{formatted.time}</span>
                </div>

                <span className="entry-name">
                  {entry.name} ({entry.number})
                </span>
              </div>
              <div className="entry-buttons">
                <button
                  className="dropdown-btn"
                  onClick={() => handleDropDown(entry._id)}
                >
                  {openEntry === entry._id ? "▲" : "▼"}
                </button>
                <button
                  className="close-btn"
                  onClick={() => itemRemove(entry._id)}
                >
                  X
                </button>
              </div>
            </div>

            {openEntry === entry._id && (
              <div className="entry-items">
                {entry.items.map((item, idx) => (
                  <p key={idx} className="item-line">
                    {item.product} — {item.quantity}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
      {confirm && (
        <Modal onClose={handleCloseModel}>
          <h2>Are You Sure?</h2>
          <div className="model-btn">
            <button onClick={handleCloseModel} className="confirm-close">
              Close
            </button>
            <button onClick={()=>removeConfirm(deleteId)} className="confirm-confirm" disabled={deleting}>
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NotInSheetShop;
