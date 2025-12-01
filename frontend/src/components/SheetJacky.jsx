import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import './SheetJacky.css'

const SheetJacky = () => {
  const content=[
    {
      id:1,
      name:"In-Shop",
      route:"SheetShop"
    },
      {
      id:2,
      name:"Not-In-Shop",
      route:"NotInSheetShop"
    }
  ]
  const navigate=useNavigate();
  const handleclick=(route)=>{
    
      navigate(route)
  }
  return (
    <div className='sheet-wrapper'>
      <h1>Sheet page</h1>
      <div className='sheet-container'>
      {
        content.map((item)=>(
          <button key={item.id} onClick={()=>handleclick(item.route)} className='sheetbtn'>{item.name}</button>
        ))
      }
      </div>
    <Outlet />
    </div>
  )
}

export default SheetJacky
