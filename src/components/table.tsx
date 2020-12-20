import React, { useContext } from 'react'
import CreateContext from '../hook/create-context'
import Loading from '../components/loading'
import { Table } from 'antd'

export interface Props {
  onPage: (param: number) => void
}

export default (props: Props): JSX.Element => {
  const data = useContext(CreateContext)
  const { totalCount, pageIndex, pageSize, columns, list, loading } = data
  const onPage = (page: number) => props.onPage(page)
  return (
    <>
      {
        pageSize ?
          <Table
            className="table_container"
            columns={columns}
            dataSource={list}
            loading={loading}
            rowKey="id"
            pagination={{
              total: totalCount,
              current: pageIndex,
              pageSize,
              showQuickJumper: true,
              size: 'small',
              showTotal: (totalCount) => `共${totalCount}条数据`,
              onChange: (page) => onPage(page),
            }}
          /> : <Loading />
      }
    </>
  )
}
