import dayjs from "dayjs"
import { DateFormat } from "../typings/constant";

export const dateFormatYMD = (date: string, format = DateFormat.YMD) => {
	return dayjs(date).format(format);
}

export const arrayRandomColor = () => {
	return "#" + ((color: string) => {
		return new Array(7 - color.length).join("0") + color
	})((Math.random() * 0x1000000 << 0).toString(16))
}

export const titleMap = (URL: string) => {
	const map: { [key: string]: string } = {
		'web.jairwin.cn': `Local | `,
		'test.admin.jairwin.cn': `Test | `,
		'admin.jairwin.cn': ``,
	}
	return map[URL]
}

export const getDateDiffCountdown = (time: string): string | undefined => {
	let result = time;
	const dateTimeStamp = new Date(time.replace(/-/g, '/')).getTime();
	const minute = 1000 * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const month = day * 30;
	const now = new Date().getTime();
	const diffValue = now - dateTimeStamp;
	if (diffValue < 0) return
	const monthC: any = diffValue / month;
	const weekC: any = diffValue / (7 * day);
	const dayC: any = diffValue / day
	const hourC: any = diffValue / hour;
	const minC: any = diffValue / minute;
	if (monthC >= 1) return result = `${parseInt(monthC)}个月前`;
	if (weekC >= 1) return result = `${parseInt(weekC)}周前`;
	if (dayC >= 1) return result = `${parseInt(dayC)}天前`;
	if (hourC >= 1) return result = `${parseInt(hourC)}小时前`;
	if (minC >= 1) return result = `${parseInt(minC)}分钟前`;
	return `刚刚`;
}

// 复制
export const copyText = (value: any): boolean => {
	const forExecElement = createElementForExecCommand(value);
	selectContent(forExecElement);
	document.execCommand('copy', false);
	document.body.removeChild(forExecElement);
	return true;
}
const createElementForExecCommand = (textToClipboard: string): any => {
	const forExecElement = document.createElement('div');
	forExecElement.style.position = 'absolute';
	forExecElement.style.left = '-10000px';
	forExecElement.style.top = '-10000px';
	forExecElement.textContent = textToClipboard;
	document.body.appendChild(forExecElement);
	return forExecElement;
}
const selectContent = (element: Node): void => {
	const rangeToSelect = document.createRange();
	rangeToSelect.selectNodeContents(element);
	const selection = window.getSelection();
	selection!.removeAllRanges();
	selection!.addRange(rangeToSelect);
}
