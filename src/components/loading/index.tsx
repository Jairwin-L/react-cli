import { Spin } from 'antd';
import './loading.less';

export default function Loading() {
  return (
    <div className="loading_container">
      <Spin size="large" />
      <div className="loading_text">Loading……</div>
    </div>
  );
}
