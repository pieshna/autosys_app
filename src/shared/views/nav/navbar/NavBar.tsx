import NavbarClientSide from '@/shared/components/navbar/Navbar'
import { getCookieServerSide } from '@/shared/tools/cookies/tokenServerSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { GetDecodedToken } from '@/shared/tools/token/tokenFromClient'
import { Suspense } from 'react'

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
  const token = getCookieServerSide('token')
  const tokenDecoded = GetDecodedToken(token)
  menuItemsDefault[0].title =
    tokenDecoded?.userName || menuItemsDefault[0].title
  const data = await fetchPersonalizado(
    'nav/navbar',
    'GET',
    getCookieServerSide('token')
  )
  if (!data || data?.length === 0) {
    return menuItemsDefault
  }
  let unido = [...data, ...menuItemsDefault]
  //if rol is secretaria remove some items
  if (tokenDecoded?.rol === 'secretaria'.toUpperCase()) {
    //remove item with title 'Usuarios' or Administracion
    unido = unido.filter((item) => item.title !== 'Usuarios')
    unido = unido.filter((item) => item.title !== 'Administracion')
  }

  if (tokenDecoded?.rol === 'trabajador'.toUpperCase()) {
    unido = menuItemsDefault
  }
  return unido
}

const NavbarCustom = async ({
  getData = false,
  defaultItems = menuItemsDefault
}: {
  getData?: boolean
  defaultItems?: MenuItemInterface[]
}) => {
  const menuItems = getData ? defaultItems : await getNav().then((data) => data)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavbarClientSide menuItems={menuItems} />
    </Suspense>
  )
}

export default NavbarCustom
