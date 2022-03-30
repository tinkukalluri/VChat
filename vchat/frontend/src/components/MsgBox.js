import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { TextField, Grid, Button, ButtonGroup, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";


export default function MsgBox(props) {

    const [msgs, setMsgs] = useState(props.msgs)
    return (
        <>
            <h1>THis msg is from MSgBox</h1>
        </>
    )

}