'use client'
import NavbarClientSide from '@/shared/components/navbar/Navbar'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { GetDecodedToken } from '@/shared/tools/token/tokenFromClient'
import { useState, useEffect, Suspense } from 'react'

export interface MenuItemInterface {
  navbar_id?: string
  title: string
  link: string
  dropdown?: MenuItemInterface[]
  icon?: string
  imagen?: boolean
}

export const menuItemsDefault: MenuItemInterface[] = [
  {
    navbar_id: '1',
    title: 'Usuario',
    link: '/usuarios',
    imagen: true,
    dropdown: [
      {
        title: 'Cerrar Sesion',
        link: '/logout'
      }
    ]
  }
]

const getNav = async () => {
  const token = getCookieClientSide('token')
  const tokenDecoded = GetDecodedToken(token)
  menuItemsDefault[0].title =
    tokenDecoded?.userName || menuItemsDefault[0].title
  const data = await fetchPersonalizado(
    'nav/navbar',
    'GET',
    getCookieClientSide('token')
  )
  if (!data || data?.length === 0) {
    return menuItemsDefault
  }
  const unido = [...data, ...menuItemsDefault]
  return unido
}

const NavbarCustom = ({
  getData = false,
  defaultItems = menuItemsDefault
}: {
  getData?: boolean
  defaultItems?: MenuItemInterface[]
}) => {
  const [menuItems, setMenuItems] = useState<MenuItemInterface[]>([])
  useEffect(() => {
    if (getData) {
      setMenuItems(defaultItems)
      return
    }
    getNav().then((data) => {
      setMenuItems(data)
    })
  }, [])
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavbarClientSide menuItems={menuItems} />
    </Suspense>
  )
}

export default NavbarCustom
