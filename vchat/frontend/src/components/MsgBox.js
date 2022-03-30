import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { TextField, Grid, Button, ButtonGroup, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";

import './css/msgbox.css'

export default function MsgBox(props) {

    const [msgs, setMsgs] = useState(props.msgs)

    // useEffect(() => {
    //     console.log(msgs)
    // }, [msgs])
    console.log(props.msgs)

    function renderMsgs() {
        let list = []
        var entries = Object.entries(props.msgs)
        console.log("entries from Msgbox", entries)
        for (let msg in entries) {
            console.log("renderMsg()")
            console.log(msg)
            list.push(
                // <Typography variant="h6" compact="h6">
                //     {"id" + entries[msg][0] + "   msg_from" + entries[msg][1].msg_from + "   msg_to" + entries[msg][1].msg_to + "  " + entries[msg][1].text + "   " + entries[msg][1].send_on}

                // </Typography>
                classPlacer(entries, msg)
            )
        }
        console.log("list from MsgBox ", list);
        return list;
    }

    function classPlacer(entries, msg) {
        let myid = props.myid;
        if (myid === entries[msg][1].msg_from) {
            return (
                <div className="container">
                    <div className="user-sender">
                        {entries[msg][1].text}
                    </div>
                </div>
            )
        } else
            return (
                <div className="container">
                    <div className="contact-sender">
                        {entries[msg][1].text}
                    </div>
                </div>
            )
    }


    return (
        <>
            <Grid container spacing={1} >
                <Grid item xs={12}>
                    {renderMsgs()}
                </Grid>
            </Grid>
        </>
    )

}