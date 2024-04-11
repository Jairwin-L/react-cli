import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

export default function NotFound() {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="哎呀，页面找不到啦……"
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.goBack();
          }}
        >
          返回上一页
        </Button>
      }
    />
  );
}
