import React, { useState } from 'react'
import './SheetShop.css'
const SheetShop = () => {
    const [sheetJacky,setSheetJacky]=useState([
        {id:1,name:"Sheet",quatity:100,total:150},
        {id:2,name:"Jackey",quatity:100,total:150},
        {id:3,name:"Adjustable(B)",quatity:100,total:150},
        {id:4,name:"Adjustable(s)",quatity:100,total:150},
     ])
  return (
    <div className='sheetshop-main'>
      <h2>Total</h2>
      <div className='sheetshop-container'>
        {
            sheetJacky.map((item)=>(
                <div key={item.id} className='sheetshop-total'>
                    <span>{item.name}</span>
                    <span>{item.quatity}/{item.total}</span>
                   
                </div>
                 
            ))
        }<button className='sheetshop-btn'>Add</button>
      </div>
    </div>
  )
}

export default SheetShop
