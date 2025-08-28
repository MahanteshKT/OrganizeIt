import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolBar from '../../../UI/ToolBar/ToolBar';
import MenuCard from '../../../UI/MenuCard/MenuCard';

function NavLink(props) {
    const { navLinkObj } = props;
    const [isToolBarHovered, setIsToolBarHovered] = useState(false);
    const [isMegaMenuClick, setisMegaMenuClick] = useState(false);

    const handleMouseEnter = () => {
        setIsToolBarHovered(true);
    };

    const handleMouseLeave = () => {
        setIsToolBarHovered(false);
    };

    return (
        <div className='relative'>
            <a
                href={navLinkObj.link}
                className='navlink-link'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                    e.preventDefault();
                    if (navLinkObj.menuItems) {
                        setisMegaMenuClick((prev) => !prev);
                    }
                }}
            >
                <div
                    className={`${navLinkObj.isSideActive ? 'text-left pl-[20px]' : 'text-center'} relative text-[16px] mb-[20px] hover:text-slate-950`}
                >
                    <span className=''>
                        <FontAwesomeIcon icon={navLinkObj.fontIcon} className='text-[18px]' />
                    </span>

                    {(
                        <span className={`${navLinkObj.isSideActive ? '' : 'hidden'} pl-[10px] font-semibold animate-slideInRightMd`}>
                            {navLinkObj.navText}
                        </span>
                    )}

                    {!navLinkObj.isSideActive && (!isMegaMenuClick) && isToolBarHovered && (
                        <ToolBar isToolBarHovered={isToolBarHovered} toolText={navLinkObj.navText} />
                    )}
                </div>
            </a>
            {navLinkObj.menuItems && isMegaMenuClick && <MenuCard menuItems={ navLinkObj.menuItems } /> }
        </div>
    );
}

export default NavLink;
