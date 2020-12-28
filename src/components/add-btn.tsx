import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

export default (): JSX.Element => {
	const history = useHistory();
	return <Button type="primary" className="add_btn" onClick={() => { history.push("./add") }}>添加</Button>
}
