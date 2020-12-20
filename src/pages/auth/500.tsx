import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

export default (): JSX.Element => {
  const history = useHistory()
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={() => { history.goBack() }}>返回上一页</Button>
      }
    />
  )
}
