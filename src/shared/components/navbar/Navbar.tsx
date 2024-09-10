'use client'

import MenuItem from '@/shared/components/navbar/MenuItem'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import {
  GetDecodedToken,
  tokenIsAlive
} from '@/shared/tools/token/tokenFromClient'
import { MenuItemInterface } from '@/shared/views/nav/navbar/NavBar'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function NavbarClientSide({ menuItems }: { menuItems: MenuItemInterface[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const token = getCookieClientSide('token')
    const { hasToken } = GetDecodedToken(token)
    const isAlive = tokenIsAlive(token)
    if (hasToken && isAlive) {
      setShowNavbar(true)
    } else {
      setShowNavbar(false)
    }
  }, [usePathname()])

  const handleCloseMenu = () => {
    setIsMenuOpen(true)
    setIsMenuOpen(false)
  }

  return (
    <>
      {showNavbar ? (
        <Navbar
          maxWidth="full"
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className="bg-[#e6e6e6c1]"
        >
          <NavbarContent className="sm:pr-0">
            <NavbarBrand>
              <Link href="/dashboard" onClick={handleCloseMenu} replace>
                <p className="font-bold text-inherit">AUTOSYS</p>
              </Link>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="sm:hidden" justify="end">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            />
          </NavbarContent>

          <NavbarContent
            className="hidden sm:flex gap-4 mr-10"
            justify="center"
          >
            {menuItems.map((menuItem, index) => (
              <MenuItem
                menuItem={menuItem}
                key={index}
                actualPath={path}
                handleCloseMenu={handleCloseMenu}
              />
            ))}
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((menuItem, index) => (
              <NavbarMenuItem key={index}>
                <MenuItem
                  menuItem={menuItem}
                  key={index}
                  actualPath={path}
                  handleCloseMenu={handleCloseMenu}
                />
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      ) : (
        <></>
      )}
    </>
  )
}

export default NavbarClientSide
