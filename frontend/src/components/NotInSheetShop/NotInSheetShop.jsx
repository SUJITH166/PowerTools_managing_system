import React, { useEffect, useState } from "react";

const NotInSheetShop = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/sheet/all")
      .then(res => res.json())
      .then(data => setEntries(data));
  }, []);

  return (
    <div>
      <h2>Sheet/Jacky Entries</h2>
        
      {entries.map((entry) => (
        <div key={entry._id}>
          <h3>{entry.name} ({entry.number})</h3>
          {entry.items.map((item, idx) => (
            <p key={idx}>{item.product} — {item.quantity}</p>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default NotInSheetShop;
