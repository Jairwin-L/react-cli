import React from "react"
import { Layout, Avatar } from "antd"
import CustomMenu from '../components/menu'
import { MenuItem } from '../typings/menu'

const { Sider } = Layout

interface Props {
	avatar?: string
	menuToggle: boolean
	menu: MenuItem[] | undefined
}

export default (props: Props): JSX.Element => {
	const { menuToggle, menu, avatar } = props
	return (
		<Sider className="aside" collapsed={menuToggle}>
			<div className="logo">
				<Avatar src={avatar} />
			</div>
			<CustomMenu menu={menu}></CustomMenu>
		</Sider>
	)
}
