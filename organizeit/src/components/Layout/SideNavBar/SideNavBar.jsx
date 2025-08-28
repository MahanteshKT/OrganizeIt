import React, { useEffect, useState } from 'react'
import logo from './../../../assests/logo/logo.png';
import rightArrow from './../../../assests/right-arrow.png';
import './SideBar.scss';
import MainSideNavBar from './components/MainSideNavBar/MainSideNavBar';
import BottomSideNavBar from './components/BottomSideNavBar/BottomSideNavBar';

function SideNavBar() {
    const [isSideActive, setIsSideActive] = useState(false);
    useEffect(() => {
        
    }, []);
  return (
      <div className={` ${isSideActive ? 'w-[200px] ' : 'w-[70px]'} + sidebar fixed duration-500 z-50 h-[100vh] p-[12px] bg-slate-100 top-0 left-0 bg-opacity-60 rounded-e-md backdrop-blur-md shadow-2xl boxShadow-3xl mb-[12px] flex flex-col justify-between`}>
          <div className='sidebar-container w-[100%]'>
              <div className='w-[44px] h-[44px] rounded-[50%] bg-black m-auto cursor-pointer'>
                <img src={logo} alt="OrganizeIt"/>
              </div>
          </div>
          <span className='sidebar-nav-tool' onClick={(e) => {
                    e.preventDefault();
                    setIsSideActive((prev) => !prev);
                }}>
              <img src={rightArrow} className={`${isSideActive ? 'slide' : ''} object-contain`} alt="" srcset="" />
          </span>
          <MainSideNavBar isSideActive={ isSideActive} />
          <BottomSideNavBar isSideActive={ isSideActive}/>
      </div>
  )
}

export default SideNavBar