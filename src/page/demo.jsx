import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Router from './router'
// 解决safari自带放大功能：阻止双击放大
let lastTime = 0
document.addEventListener('touchstart', event => {
  if (event.touches.length > 1) event.preventDefault()
})
document.addEventListener('touchend', event => {
  const nowTime = (new Date()).getTime()
  if (nowTime - lastTime <= 300) event.preventDefault()
  lastTime = nowTime
}, false)

// 解决safari自带放大功能：阻止双指放大
document.addEventListener('gesturestart', event => {
  event.preventDefault()
})
export default () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Router />
        </Switch>
      </BrowserRouter>
    </>
  )
}
