import React from 'react'
import NavLink from '../NavLink'
import { faPlus, faGear, faNotesMedical, faFolder, faUser, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import SideBarResources from '../../../../../resource/SideBar/SideBarResources';
function MainSideNavBar(props) {
  return (
      <div className='w-[100%] max-h-[252] text-center flex flex-col gap-[16px] text-gray-600'>
          <span className='text-[12px] text-center text-slate-600'>
              { SideBarResources.login.text }
          </span>
          <NavLink navLinkObj={{
            isSideActive: props.isSideActive,
            link: '#',
            fontIcon: faUser,
            navText: SideBarResources.navlinks.login.text
            }} />
          <span className='text-[12px] text-center text-slate-600'>
            { SideBarResources.main.text }
          </span>
          <div className='text-gray-600'>
              <NavLink navLinkObj={{
                  isSideActive: props.isSideActive,
                  link: '#',
                  fontIcon: faPlus,
                  navText: SideBarResources.navlinks.create.text,
                  menuItems: [
                        {
                            link: '#',
                            name: 'Create Note',
                        },
                        {
                            link: '#',
                            name: 'Create Folder',
                        },
                    ]
              }} />
              <NavLink navLinkObj={{
                  isSideActive: props.isSideActive,
                  link: '#',
                  fontIcon: faFolder,
                  navText: SideBarResources.navlinks.searchFolder.text
              }} />
              <NavLink navLinkObj={{
                  isSideActive: props.isSideActive,
                  link: '#',
                  fontIcon: faNotesMedical,
                  navText: SideBarResources.navlinks.searchNotes.text
              }} />
              <NavLink navLinkObj={{
                  isSideActive: props.isSideActive,
                  link: '#',
                  fontIcon: faAddressBook,
                  navText: SideBarResources.navlinks.about.text
              }} />
            </div>
            <span className='text-[12px] text-center text-slate-600'>
              { SideBarResources.settings.text }
            </span>
          <div className='text-gray-600'>
                <NavLink navLinkObj={{
                    isSideActive: props.isSideActive,
                    link: '#',
                    fontIcon: faGear,
                    navText: SideBarResources.navlinks.settings.text
                }} />
            </div>
      </div>
  )
}

export default MainSideNavBar