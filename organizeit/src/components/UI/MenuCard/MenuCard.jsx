import React from 'react'
import MenuItem from './MenuItem';
import './MenuCard.scss';
function MenuCard(props) {
    console.log(props)
    return (
        <div className={`menuCard absolute left-[100%] bg-slate-50 top-0 p-[8px] min-w-[100%] rounded-md shadow-sm`
} >
          {props.menuItems && props.menuItems.length && props.menuItems.map((menuItem, index) =>
              <>
                <MenuItem key={index} menuItem={menuItem} />
              </>
          )}
    </div>
  )
}

export default MenuCard;