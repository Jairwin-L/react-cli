import React from 'react'
import './assets/css/main.less'
import avatar from './assets/img/avatar.jpg'
import LongTimeNoSee from './assets/media/longtimenosee.mp3'
import { hot } from 'react-hot-loader';
// import { Button } from 'antd'

// import { Button } from 'antd'

export default hot(module)(
  () => (
    <>
      <div className="react">
        <p>React-Custom-Cli</p>
        <img src={avatar} alt="" />
        {/* <audio src={LongTimeNoSee} autoPlay></audio> */}
        {/* <Button>按钮</Button> */}
      </div>
      {/* <Button>React</Button> */}
    </>
  )
)
