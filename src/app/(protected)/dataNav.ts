import { MenuItemInterface } from '@/shared/views/nav/navbar/NavBar'

export const dataNavPagador: MenuItemInterface[] = [
  {
    navbar_id: '994d46d1-6585-4262-a7d3-bb60b1705690',
    title: 'Clientes',
    link: '/clientes'
  },
  {
    navbar_id: 'a887c4cd-ce88-4995-8ad2-e28768d04ed4',
    title: 'Compras',
    link: '/compras'
  },
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
