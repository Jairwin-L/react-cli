import React, { useState } from "react";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import "@css/main.less";
import { dateFormatYMD } from "../utils";
import { DateFormat } from "../typings/constant";

export default (): JSX.Element => {
	const [rangeTime, setRangeTime] = useState<string[]>([]);
	const [dates, setDates] = useState<string[]>([]);
	const onRangePicker = (dates: any, dateStrings: string[]): void => {
		console.log("dates==========>：", dates);
		console.log("dates[0]==========>：", dates[0].valueOf());
		console.log("dates[1]==========>：", dates[1].valueOf());
		setDates(dates);
		console.log("dateStrings==========>：", dateStrings);
		setRangeTime(dateStrings);
	}
	return (
		<div className="base_container animated fadeIn">
			<p className="text">欢迎</p>
			<RangePicker onChange={onRangePicker} />
			<p>时间：{(rangeTime[0] || rangeTime[1]) ? `${rangeTime[0]}——${rangeTime[1]}` : "未选择时间"}</p>
			<p>时间戳转年月日：{(dates[0] || dates[1]) ? `${dateFormatYMD(dates[0])}——${dateFormatYMD(dates[1])}` : "未选择时间"}</p>
			<p>时间戳转年月日 时分秒：{(dates[0] || dates[1]) ? `${dateFormatYMD(dates[0], DateFormat.YMD_HMS)}——${dateFormatYMD(dates[1], DateFormat.YMD_HMS)}` : "未选择时间"}</p>
			<p>时间戳：{(dates[0] || dates[1]) ? `${dates[0].valueOf()}——${dates[1].valueOf()}` : "未选择时间戳"}</p>
		</div>
	);
};
