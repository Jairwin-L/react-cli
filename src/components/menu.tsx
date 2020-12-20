import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom'
import { MenuItem } from '../typings/menu'
import Icon from "../components/icon"
interface Keys {
  openKeys: string[]
  selectedKeys: string[]
}

// 处理 pathname
const getOpenKeys = (string: string) => {
  let newStr = '',
    newArr = [],
    arr = string.split('/').map((i: any) => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  console.log(newArr);
  return newArr
}

export default (props: any): JSX.Element => {
  const { menu } = props
  const pathname = useLocation().pathname
  const [state, setState] = useState<Keys>({
    openKeys: [],
    selectedKeys: []
  })
  const { openKeys, selectedKeys }: { openKeys: string[], selectedKeys: string[] } = state
  useEffect(() => {
    setState((prevState: Keys) => {
      return {
        ...prevState,
        selectedKeys: [pathname],
        openKeys: getOpenKeys(pathname)
      }
    })
  }, [props])
  // 只展开一个 SubMenu
  const onOpenChange = (openKeys: any) => {
    console.log(openKeys);
    setState((prevState: Keys) => {
      if (openKeys.length === 0 || openKeys.length === 1) {
        return { ...prevState, openKeys }
      }
      const latestOpenKey = openKeys[openKeys.length - 1]
      // 这里与定义的路由规则有关
      if (latestOpenKey) {
        return { ...prevState, openKeys }
      } else {
        return { ...prevState, openKeys: [latestOpenKey] }
      }
    })
    // const lastOpenKey = openKeys[openKeys.length - 1];
    // const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    // setState({
    //   openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    // });
  }

  const renderMenuItem = ({ key, icon, title }: MenuItem) => (
    <Menu.Item key={key}>
      <Link to={key}>
        {icon && <Icon type={icon} />}
        <span>{title}</span>
      </Link>
    </Menu.Item>
  )

  // 循环遍历数组中的子项 subs ，生成子级 menu
  const renderSubMenu = ({ key, icon, title, subs }: MenuItem) => {
    return (
      <Menu.SubMenu
        key={key}
        title={
          <span>
            {icon && <Icon type={icon} />}
            <span>{title}</span>
          </span>
        }>
        {subs && subs.map((item: MenuItem) => {
          return item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
        })}
      </Menu.SubMenu>
    )
  }
  // console.log(selectedKeys);
  /**
  * openKeys={openKeys}
  */
  return (
    <Menu
      mode="inline"
      theme="dark"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onClick={({ key }) => setState((prevState: any) => ({ ...prevState, selectedKeys: [key] }))}
      onOpenChange={onOpenChange}>
      {menu?.map((item: MenuItem) => item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item))}
    </Menu>
  )
}
