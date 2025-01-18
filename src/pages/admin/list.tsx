import { ColumnsType } from 'antd/es/table';
import { Item, ListData } from '../../api/response/user';
import AddBtn from '../../components/add-btn';
import Breadcrumb from '../../components/breadcrumb';
import CreateContext from '../../hook/create-context';
import TableList from '@/components/table';

export default function List() {
  const [list, setList] = useState<ListData[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>();
  const [pageSize, setPageSize] = useState<number>(1);
  const fetchList = async () => {
    setTotalCount(10);
    setPageSize(1);
    setList([]);
  };
  useEffect(() => {
    fetchList();
  }, [pageIndex]);
  const onPage = (e: number) => setPageIndex(e);
  const columns: ColumnsType<Item> = [
    {
      title: '标题',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    },
  ];
  return (
    <>
      <Breadcrumb
        arr={[
          {
            title: '管理员列表',
          },
        ]}
      />
      <CreateContext.Provider
        value={{ text: '添加用户', totalCount, pageIndex, pageSize, columns, list }}
      >
        <AddBtn />
        <TableList onPage={onPage} />
      </CreateContext.Provider>
    </>
  );
}
