import React, { useState, useEffect } from 'react'
import { Button, DatePicker } from 'antd'
import '@less/main'
import avatar from '@img/avatar.jpg'
// import LongTimeNoSee from '@media/longtimenosee.mp3'
import * as PostAction from "../api/request/post"
import { ListData, Item } from "../api/response/post"
import { DATE_FORMAT } from '../util'

export default () => {
  const [list, setList] = useState<Item[]>([])
  const [pageIndex, setPageIndex] = useState<number>(1)
  const fetchList = async () => {
    const { data }: ListData = await PostAction.list({
      curr: pageIndex,
      size: 10
    })
    const postList = Object.assign([...list, ...data.list])
    setList(postList)
    setPageIndex(data.curPage)
  }
  useEffect(() => {   
    fetchList()
  }, [pageIndex])
  const onDate = (val: any) => {
    const date = DATE_FORMAT(val)
    console.log(`date==========>：`, date);
  }
  return (
    <>
      <main className="main">
        <p>React-Custom-Cli</p>
        <DatePicker.RangePicker onChange={onDate}/>
        <p className="primary_btn">modifyVars</p>
        <img src={avatar} />
        <Button type="primary">按钮</Button>
        {/* <audio id="audio" src={LongTimeNoSee} autoPlay></audio> */}
      </main>
    </>
  )
}