import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { TextField, Grid, Button, ButtonGroup, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";

import './css/msgbox.css'
import img from "./images/1.jpeg"



export default function MsgBox(props) {

    const [msgs, setMsgs] = useState(props.msgs)

    // useEffect(() => {
    //     //console.log(msgs)
    // }, [msgs])
    //console.log(props.msgs)

    function renderMsgs() {
        let list = []
        var entries = Object.entries(props.msgs)
        //console.log("entries from Msgbox", entries)
        for (let msg in entries) {
            //console.log("renderMsg()")
            //console.log(msg)
            list.push(
                // <Typography variant="h6" compact="h6">
                //     {"id" + entries[msg][0] + "   msg_from" + entries[msg][1].msg_from + "   msg_to" + entries[msg][1].msg_to + "  " + entries[msg][1].text + "   " + entries[msg][1].send_on}

                // </Typography>
                classPlacer(entries, msg)
            )
        }
        //console.log("list from MsgBox ", list);
        return list;
    }

    function classPlacer(entries, msg) {
        let myid = props.myid;
        if (myid === entries[msg][1].msg_from) {
            return (
                <div class="_container sender">
                    <img class="right" src={img} alt="sender" />
                    <div class="user-sender">
                        {entries[msg][1].text}
                    </div>
                    <span class="time-left">{entries[msg][1].send_on}</span>
                </div>
            )
        } else
            return (
                <div class="_container receiver">
                    <img class="left" src={process.env.PUBLIC_URL + "images/1.jpeg"} alt="reciver" />
                    <div class="contact-sender">
                        {entries[msg][1].text}
                    </div>
                    {/* <div class="time-right">{entries[msg][1].send_on}</div> */}
                    <span class="time-right">{entries[msg][1].send_on}</span>
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