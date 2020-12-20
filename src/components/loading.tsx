import React from 'react'
import { Spin } from 'antd'
import '@css/components/loading.less'

export default (): JSX.Element => {
  return (
    <>
      <div className="loading_container">
        <Spin size="large" />
        <div className="loading_text">Loading……</div>
      </div>
    </>
  )
}
