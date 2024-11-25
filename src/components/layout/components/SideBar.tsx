import { CiPillsBottle1, CiSettings, CiWallet } from 'react-icons/ci'
import { FaHome } from 'react-icons/fa'
import { TbUsersGroup } from 'react-icons/tb'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'src/components/ui/sidebar'
import useDecodeToken from 'src/hooks/useDecodeToken'

const SideBar = () => {
  const tokenData = useDecodeToken()
  const role = tokenData?.role
  let items = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: <FaHome />,
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: <CiWallet />,
    },
    {
      title: 'Products',
      url: '/products',
      icon: <CiPillsBottle1 />,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: <CiSettings />,
    },
  ]

  const adminItems = [
    {
      title: 'Reports',
      url: '/reports',
      icon: <CiSettings />,
    },
    {
      title: 'Users',
      url: '/users',
      icon: <TbUsersGroup />,
    },
  ]

  items = role === 'admin' || role === 'manager' ? [...items, ...adminItems] : items
  return (
    <Sidebar>
      <SidebarContent className="bg-red-500">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideBar
