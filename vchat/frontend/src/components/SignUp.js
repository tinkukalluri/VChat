import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { TextField, Grid, Button, ButtonGroup, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
import Password from "./password.js"

import css from "./css/signup.css";



export default function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [created, setCreated] = useState("");
    const [passwordHash, setPasswordHash] = useState("");
    const [checked, setChecked] = useState("true");

    useEffect(() => {
        console.log(created)
    }, [created])

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleTextFieldUsernameChange(e) {
        setUsername(e.target.value)
    }

    function handleTextFieldEmailChange(e) {
        setEmail(e.target.value)
    }


    function handleTextFieldPasswordChange(pass) {
        setPassword(pass)
    }

    useEffect(() => {
        console.log("passowrd::", password)
    }, [password])

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function signupButtonPressed(e) {

        console.log(username, password, email)
        const csrftoken = getCookie('csrftoken');
        console.log("csrf_token::" + csrftoken);
        const requestOptions = {
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            headers: { 'X-CSRFToken': csrftoken },
            mode: 'same-origin',
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password,
            }),
        };
        const request = new Request(
            "/api/signup",
            {
                method: 'POST',
                headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
                mode: 'same-origin',// Do not send CSRF token to another domain.
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "email": email,
                })
            }
        );
        fetch(request).then((response) => {
            return response.json();
        }).then(data => {
            console.log(data)
            if (data.status == true) {
                setCreated("Account Created Successfully")
                setError(false)
                console.log("in jabdj aujdba abd");
                console.log(created)
            } else {
                setCreated(data.status)
                setError(true)
                console.log();
            }
            console.log("outside");
        });
    }



    return (
        < Grid container spacing={1} >
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Create Account
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                    error={error}
                    label="username"
                    placeholder="Enter Username"
                    value={username}
                    helperText={created}
                    variant="outlined"
                    onChange={handleTextFieldUsernameChange}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                    error={error}
                    label="email"
                    placeholder="Enter Email"
                    value={email}
                    helperText={error}
                    variant="outlined"
                    onChange={handleTextFieldEmailChange}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Password className="_pass" _onChange={handleTextFieldPasswordChange} />
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={signupButtonPressed}
                >
                    Signup
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid >
    );
}