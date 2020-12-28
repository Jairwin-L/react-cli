import loadable from "../../utils/loadable";
const prePath = "/auth/";
const router = [
	{
		path: "404",
		name: "400",
		component: loadable(() => import(/* webpackChunkName: 'index' */ "./404")),
		auth: [1]
	},
	{
		path: "500",
		name: "500",
		component: loadable(() => import(/* webpackChunkName: 'index' */ "./500")),
		auth: [1]
	},
	{
		path: "change-password",
		name: "修改密码",
		component: loadable(() => import(/* webpackChunkName: 'index' */ "./change-password")),
		auth: [1]
	}
];

router.forEach(item => item.path = prePath + item.path);

export default router;
