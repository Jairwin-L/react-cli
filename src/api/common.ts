// Response
export interface CommonPageResponse {
	totalCount: number // 总数
	pageSize: 10 // 每页条数
	totalPage: number
	curPage: number // 页码
}
// 列表
export interface CommonPageParam {
	curr: number | undefined,
	size: 10
}
