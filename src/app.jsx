import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import './assets/css/main.less'
import avatar from './assets/img/avatar.jpg'
import LongTimeNoSee from './assets/media/longtimenosee.mp3'
import {hot} from 'react-hot-loader';
import Router from './router'
// import { Button } from 'antd'

export default () => {
  return (
    <>
      {/* <BrowserRouter>
        <Switch>
          <Router />
        </Switch>
      </BrowserRouter> */}
      <div className="react">
        <p>React-Custom-Cli</p>
        <img src={avatar} alt="" />
      </div>
      {/* <audio id="audio" src={LongTimeNoSee} autoPlay></audio> */}
      {/* <Button>React</Button> */}
    </>
  )
}