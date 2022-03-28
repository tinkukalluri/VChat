import React, { useState, useEffect } from "react";

import {
    TextField,
    Grid,
    Button,
    ButtonGroup,
    Typography,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";

let pass = "";
import css from "./css/password.css"

export default function App(props) {
    const [passwordHash, setPasswordHash] = useState("");
    const [checked, setChecked] = useState(false);
    const [password, setPassword] = useState("");
    useEffect(() => {
        // Update the document title using the browser API
        console.log("componentDidMount");
    });

    function stars(pass) {
        var str1 = "";
        var len = pass.length;
        console.log("pass::" + pass);
        // console.log(pass.length);
        while (len--) {
            str1 += "$";
        }
        if (checked === false) {
            setPasswordHash(str1);
        } else {
            setPasswordHash(pass);
        }
    }

    useEffect(() => {
        console.log("password_updated::" + password);
    }, [password]);

    function handleTextFieldPasswordChange(e) {
        let str = e.target.value;
        let str_len = str.length;
        var pass_copy = pass;
        let pass_copy_len = pass_copy.length;
        console.log("pass_copy::" + pass_copy);
        if (str_len < pass_copy_len) {
            let remove_len = pass_copy_len - str_len;
            var re_str = pass_copy.slice(0, -remove_len);
            console.log("re_str::" + re_str);
            pass = re_str;
        } else {
            let str3 = pass_copy + str[str_len - 1];
            console.log("str3::" + str3);
            pass = str3;
        }
        console.log("pass::" + pass);
        setPassword(pass);
        stars(pass);
    }

    useEffect(() => {
        stars(pass);
        console.log(checked);
    }, [checked]);

    useEffect(() => {
        if (props.clear) {
            console.log("password set to null");
            setPasswordHash('');
        }
    })

    function handleshowPasswordChange(e) {
        let check = e.target.checked;
        setChecked(check);
    }

    const callBack = props._onChange(password)

    return (
        <div className="App">
            <TextField
                // error={error}
                label="password"
                placeholder="Enter a Password"
                value={passwordHash}
                // helperText={error}
                variant="outlined"
                onChange={handleTextFieldPasswordChange}
            />
            {/* <FormControlLabel
        control={<Checkbox onChange={handleshowPasswordChange} />}
        label="show password"
        defaultValue="0"
      /> */}
            <Checkbox
                checked={checked}
                onChange={handleshowPasswordChange}
                inputProps={{ "aria-label": "controlled" }}
            />
        </div>
    );
}
