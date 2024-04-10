import { ApiUrl } from "../typings/constant";

export let BASE_URL = "";
export const HostName = window.location.hostname;
export const protocol = window.location.protocol;
export const ORIGIN = window.location.origin;
export const API_URL_MAP = {
	"localhost": ApiUrl.MOCK,
	"react-custom-cli": ApiUrl.MOCK,
};

for (let [key, value] of Object.entries(API_URL_MAP)) {
	if (HostName.includes(key)) {
		BASE_URL = value;
		break
	}
}

export default {
	BASE_URL,
	API_URL_MAP,
	HostName,
	protocol,
	ORIGIN
}
