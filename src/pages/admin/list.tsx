import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";
import * as AdminAction from "../../api/request/admin";
import { ListData, Item } from "../../api/response/user";
import CreateContext from "../../hook/create-context";
import AddBtn from "../../components/add-btn";

export default (): JSX.Element => {
	const [list, setList] = useState<ListData[]>([])
	const [pageIndex, setPageIndex] = useState<number | undefined>(1);
	const [totalCount, setTotalCount] = useState<number | undefined>();
	const [totalPage, setTotalPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<10>();
	const fetchList = async () => {
		const data: ListData = await AdminAction.list({
			curr: pageIndex,
			size: 10,
		})
		setList([].concat.apply([], data?.list));
		setTotalCount(data?.totalCount);
		setPageSize(data?.pageSize);
		setTotalPage(data?.totalPage);
	};
	useEffect(() => {
		fetchList()
	}, [pageIndex]);
	const onPage = (e: number) => setPageIndex(e);
	const columns: ColumnsType<Item> = [
		{
			title: "标题",
			dataIndex: "username",
			key: "username",
			align: "center",
		},
	]
	return (
		<>
			<Breadcrumb
				arr={[
					{
						title: "管理员列表"
					}
				]}></Breadcrumb>
			<CreateContext.Provider value={{ text: "添加用户", totalCount, pageIndex, pageSize, columns, list }}>
				<AddBtn />
				<Table onPage={onPage} />
			</CreateContext.Provider>
		</>
	);
};
