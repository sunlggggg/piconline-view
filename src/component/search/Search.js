import React from "react"
import ReactDOM from "react-dom"
import Button from "@material-ui/core/Button"
import 'antd/dist/antd.css'
import { Input } from "antd"
const Search = Input.Search;
const styles = {
    root: {
        flexGrow: 1,
    },
};
function MySearch() {
    return (
        <div>
            <Search
                placeholder="search ... "
                onSearch={value => console.log(value)}
                style={{ width: 600, height}}
            />
        </div>
    );
}

export default MySearch;