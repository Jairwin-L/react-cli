import { message, Modal } from "antd"
import fly, { FlyResponse, FlyRequestConfig } from 'flyio'
import { ORIGIN } from './config'
import config from './config'

type RequestConfig = FlyRequestConfig & { data: any }

function commonResponse(res: RequestConfig) {
	return res?.data
}

function responseMessage(msg: string, statusCode?: number) {
	msg && (statusCode === 1 ? message.success(msg) : message.error(msg))
}

fly.interceptors.request.use((request: FlyRequestConfig) => {
	request.headers.apifoxToken = 'sXedLKsR7alyUTRseHi3l'
	if (sessionStorage.getItem('token')) {
		request.headers['token'] = sessionStorage.getItem('token')
		request.headers['Content-Type'] = 'application/json'
		request.headers['Accept'] = 'application/json'
	}
	return request
})

fly.interceptors.response.use(
	(response: FlyResponse) => { return response },
	(err: any) => {
		const data: any = err.response?.data
		const statusCode = Number(data?.code)
		if (statusCode === 401) {
			return Promise.reject(
				Modal.error({
					title: `提示`,
					content: `登录超时，请重新登录！`,
					centered: true,
					okText: '退出',
					onOk: () => {
						sessionStorage.clear()
						window.location.replace(`${ORIGIN}`)
					}
				})
			)
		}
		if (statusCode === 404) return Promise.reject(err)
		//发生网络错误后会走到这里
		return Promise.reject(err.status)
	}
)

class ApiRequest {
	private static instance: ApiRequest
	private BASE_URL: string = ''
	private constructor(BASE_URL: string) {
		this.BASE_URL = BASE_URL
	}
	public static getInstance(BASE_URL: string) {
		if (!this.instance) this.instance = new ApiRequest(BASE_URL)
		return this.instance
	}
	public async get(url: string, params: any = {}): Promise<any> {
		const res: any = await fly.get(`${this.BASE_URL}${url}`, params);
		const { data } = res;
		return new Promise((resolve, reject) => {
			if (data.success) {
				responseMessage(data?.msg, 1)
				resolve(data)
			} else {
				responseMessage(data?.msg)
				reject(data)
			}
		})
	}
	public async post(url: string, data: any = {}): Promise<any> {
		const res: any = await fly.post(`${this.BASE_URL}${url}`, data)
		const { data: commonData, statusCode }: any = commonResponse(res)
		return new Promise((resolve, reject) => {
			if (statusCode === 1) {
				responseMessage(commonData?.msg, 1)
				resolve(commonData?.data)
			} else if (statusCode === 0) {
				responseMessage(commonData?.msg, 0)
				reject(commonData)
			} else {
				responseMessage(commonData?.msg)
				reject(commonData)
			}
		})
	}
	public async delete(url: string, params: any = {}): Promise<any> {
		const res: any = await fly.delete(`${this.BASE_URL}${url}/${params}`)
		const { data, statusCode } = commonResponse(res)
		return new Promise((resolve, reject) => {
			if (statusCode === 1) {
				responseMessage(data?.msg, 1)
				resolve(res)
			} else {
				responseMessage(data?.msg)
				reject(data)
			}
		})
	}
	public async put(url: string, data: any = {}): Promise<any> {
		const res: any = await fly.put(`${this.BASE_URL}${url}`, data)
		const { data: commonData, statusCode } = commonResponse(res)
		return new Promise((resolve, reject) => {
			if (statusCode === 1) {
				responseMessage(commonData?.msg, 1)
				resolve(res)
			} else {
				responseMessage(commonData?.msg)
				reject(commonData)
			}
		})
	}
}

export default ApiRequest.getInstance(config.BASE_URL)
