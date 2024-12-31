import React from 'react'
import './ToolBar.scss';
function ToolBar(props) {
  return (
      <div className={`${props.isToolBarHovered ? 'flex' : 'flex'} p-[10px] toolbar absolute top-[0px] left-[100%] rounded-md bg-slate-950 min-w-[94px] min-h-[30px] text-left flex justify-center items-center animate-slideInRight`}>
          <span className='text-center text-slate-50 text-[12px]'>
              { props.toolText }
          </span>
      </div>
  )
}

export default ToolBar