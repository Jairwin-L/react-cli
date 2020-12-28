import React from "react"
import { Breadcrumb } from "antd"
import { Link } from "react-router-dom"

interface Props {
	arr: BreadCrumb[]
}

interface BreadCrumb {
	title: string
	path?: string
}

const CustomBreadcrumb = (props: Props): JSX.Element => {
	return (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to="/main">首页</Link>
			</Breadcrumb.Item>
			{props?.arr?.map((item: BreadCrumb, index: number) => {
				if (typeof item === 'object') {
					return (
						<Breadcrumb.Item key={index}>
							{item.path ? <Link to={item.path}>{item.title}</Link> : <span>{item.title}</span>}
						</Breadcrumb.Item>
					)
				} else {
					return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
				}
			})}
		</Breadcrumb>
	)
}

function shouldRender(nextProps: Props, prevProps: Props) {
	if (nextProps.arr.join() === prevProps.arr.join()) return true
	return false
}

export default React.memo(CustomBreadcrumb, shouldRender)
