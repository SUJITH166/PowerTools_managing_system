import { useContext } from "react";
import { ToolContext } from "../../context/ToolContext";
import './NotInShop.css'

const NotInShop = () => {
  const { notInShopData,deleteItem } = useContext(ToolContext);

  return (
    <div>
      <h1>Not In Shop</h1>

      <div className="item-box-main">
      <h3>Name</h3>
      <h3>Number</h3>
      <h3>Quantity</h3>
      <h3>Extra</h3>
      <h3>Item</h3>
      
      </div>
      {notInShopData.map((item, index) => (
        <div key={index} className="item-box">
          
          <p>{item.name}</p>
          <p> {item.number}</p>
          <p>{item.quantity}</p>
          <p> {item.extra}</p>
          <p>{item.item}</p>
          <button onClick={() => deleteItem(index)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default NotInShop;
