import { Table } from 'antd';
import Loading from '../components/loading';
import CreateContext from '../hook/create-context';

export interface Props {
  onPage: (param: number) => void;
}

export default (props: Props) => {
  const data = useContext(CreateContext);
  const { total, pageIndex, pageSize, columns, list, loading } = data;
  const onPage = (page: number) => props.onPage(page);
  return (
    <>
      {pageSize ? (
        <Table
          className="table_container"
          columns={columns}
          dataSource={list}
          loading={loading}
          rowKey="id"
          pagination={{
            total,
            current: pageIndex,
            pageSize,
            showQuickJumper: true,
            size: 'small',
            showTotal: (totalCount) => `共${totalCount}条数据`,
            onChange: (page) => onPage(page),
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};
