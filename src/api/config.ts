let BASE_URL = ``
const hostName = window.location.hostname
const protocol = window.location.protocol
const BASE_URL_MAP = {
  'web.jairwin.cn': `test.api.jairwin.cn`,
  'demo.jairwin.cn': `test.api.jairwin.cn`,
}
for (let [key, value] of Object.entries(BASE_URL_MAP)) {
  if (hostName.includes(key)) {
    BASE_URL = `${protocol}//${value}/api/`
    break
  }
}
export default {
  BASE_URL,
  BASE_URL_MAP,
}
