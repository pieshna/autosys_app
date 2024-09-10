'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem
} from '@nextui-org/react'
import { IconChevronDown } from '@tabler/icons-react'
import Link from 'next/link'

interface MenuItemProps {
  menuItem: {
    title: string
    link: string
    icon?: string
    dropdown?: {
      title: string
      link: string
      icon?: string
    }[]
  }
  actualPath?: string
  handleCloseMenu?: () => void
}

const MenuItem = ({ menuItem, actualPath, handleCloseMenu }: MenuItemProps) => {
  if (menuItem.dropdown) {
    return (
      <>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="p-0 gap-0 bg-transparent data-[hover=true]:bg-transparent"
                disableRipple
                endContent={<IconChevronDown />}
              >
                {menuItem.title}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            {menuItem.dropdown.map(({ link, title }) => {
              return link === '/logout' ? (
                <DropdownItem key={link} href={link}>
                  Cerrar sesión
                </DropdownItem>
              ) : (
                <DropdownItem key={link} onClick={handleCloseMenu}>
                  <Link key={link} href={link} className="block">
                    {title}
                  </Link>
                </DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
      </>
    )
  } else {
    return (
      <>
        <NavbarItem
          isActive={actualPath == menuItem.link}
          onClick={handleCloseMenu}
        >
          <Link href={menuItem.link} replace>
            {menuItem.title}
          </Link>
        </NavbarItem>
      </>
    )
  }
}

export default MenuItem
