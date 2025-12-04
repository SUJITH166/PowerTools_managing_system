import React, { useEffect, useState } from "react";
import "./NotInSheetShop.css"; // ⬅ import CSS file

const NotInSheetShop = () => {
  const [entries, setEntries] = useState([]);
    const [openEntry, setOpenEntry] = useState(null);
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
  const handleDropDown=(id)=>{
      setOpenEntry(openEntry === id ? null : id);
  }
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
                <button className="dropdown-btn" onClick={()=>handleDropDown(entry._id)}>{openEntry === entry._id ? "▲" : "▼"}</button>
                <button className="close-btn">X</button>
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
    </div>
  );
};

export default NotInSheetShop;
