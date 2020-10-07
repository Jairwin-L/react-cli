import React from 'react'
import {Button} from 'antd'
import '@less/main'
import avatar from '@img/avatar.jpg'
import LongTimeNoSee from '@media/longtimenosee.mp3'

export default () => (
  <>
    <main className="main">
      <p>React-Custom-Cli</p>
      <p className="primary_btn">modifyVars</p>
      <img src={avatar} />
      <Button type="primary">按钮</Button>
      <audio id="audio" src={LongTimeNoSee} autoPlay></audio>
    </main>
  </>
)
