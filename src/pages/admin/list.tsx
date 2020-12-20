import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Popconfirm, Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Breadcrumb from '../../components/breadcrumb';
import Table from '../../components/table';
import * as AdminAction from '../../api/request/admin';
import { ListData, Item } from "../../api/response/user"
import CreateContext from '../../hook/create-context'
import AddBtn from '../../components/add-btn'

export default (): JSX.Element => {
  const [list, setList] = useState<ListData[]>([])
  const [pageIndex, setPageIndex] = useState<number | undefined>(1)
  const [totalCount, setTotalCount] = useState<number | undefined>()
  const [totalPage, setTotalPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<10>()
  const fetchList = async () => {
    const data: ListData = await AdminAction.list({
      curr: pageIndex,
      size: 10,
    })
    setList([].concat.apply([], data?.list))
    setTotalCount(data?.totalCount)
    setPageSize(data?.pageSize)
    setTotalPage(data?.totalPage)
  }
  useEffect(() => {
    fetchList()
  }, [pageIndex])
  const onPage = (e: number) => setPageIndex(e)
  const onDel = async (id: string | undefined) => {
    await AdminAction.destroy({ id })
    pageIndex !== 1 && list && list.length === 1 ? setPageIndex(totalPage - 1) : fetchList()
  }
  const columns: ColumnsType<Item> = [
    {
      title: '标题',
      dataIndex: 'username',
      key: 'username',
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (operation: Item) => (
        <>
          <Link className="edit_btn" to={`./edit/${operation.id}`}>编辑</Link>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除该用户？"
            okText="确认"
            cancelText="取消"
            onConfirm={() => { onDel(operation.id) }}>
            <a href="javascript" className="delete_btn">删除</a>
          </Popconfirm>
        </>
      )
    }
  ]
  return (
    <>
      <Breadcrumb
        arr={[
          {
            title: '管理员列表'
          }
        ]}></Breadcrumb>
      <CreateContext.Provider value={{ text: `添加用户`, totalCount, pageIndex, pageSize, columns, list }}>
        <AddBtn />
        <Table onPage={onPage} />
      </CreateContext.Provider>
    </>
  )
}
