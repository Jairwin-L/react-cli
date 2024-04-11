import '@css/components/loading.less';
import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="loading_container">
      <Spin size="large" />
      <div className="loading_text">Loading……</div>
    </div>
  );
}
