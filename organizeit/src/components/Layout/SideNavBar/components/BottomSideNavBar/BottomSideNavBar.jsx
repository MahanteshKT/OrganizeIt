import React from 'react'
import NavLink from '../NavLink'
import { faHandsHelping ,faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
function BottomSideNavBar(props) {
  return (
    <div className='text-gray-600'>
    <NavLink navLinkObj={{
        isSideActive: props.isSideActive,
        link: '#',
        fontIcon: faHandsHelping,
        navText: 'Help'
        }} />
    <NavLink navLinkObj={{
        isSideActive: props.isSideActive,
        link: '#',
        fontIcon: faRightFromBracket,
        navText: 'Logout Account'
        }} />
</div>
  )
}

export default BottomSideNavBar