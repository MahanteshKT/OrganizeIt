import React from 'react'

function MenuItem(props) {
  return (
      <a className='p-[10px] flex min-w-[150px] flex-grow whitespace-nowrap text-[12px] md:text-[14px] hover:text-slate-950 hover:bg-slate-200 rounded-sm' href={ props.menuItem.link} >
          { props.menuItem.name }
    </a>
  )
}

export default MenuItem