import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Boot_Button from "react-bootstrap/Button";
import { Grid, Button, ButtonGroup, Typography, TextField } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

import css from "./css/Login.css";
import Password from "./password.js"

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

var csrftoken = ""

export default function Login() {
    // const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [created, setCreated] = useState("");
    const [logged, setLogged] = useState(false);
    const [clear, setCLear] = useState(false);



    function handleSubmit(e) {
        console.log(username, password)

        // const requestOptions = {
        //     method: "POST",
        //     // headers: { "Content-Type": "application/json" },
        //     headers: { 'X-CSRFToken': csrftoken },
        //     mode: 'same-origin',
        //     body: JSON.stringify({
        //         "username": username,
        //         "password": password,
        //     }),
        // };
        const request = new Request(
            "/api/login",
            {
                method: 'POST',
                headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
                mode: 'same-origin',// Do not send CSRF token to another domain.
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                })
            }
        );
        fetch(request).then((response) => {
            return response.json();
        }).then(data => {
            console.log(data)
            if (data.status) {
                setCreated("Loged in")
                setError(false)
                console.log("in jabdj aujdba abd");
                console.log(created)
            } else {
                setCreated("wrong user or password")
                setError(true)
                console.log();
            }
            setUsername('')
            setCLear(true)
            console.log("outside");
        });
        userInRoom()
    }



    function handleTextFieldPasswordChange(pass) {
        setPassword(pass);
        setCLear(false);
    }

    function handleTextFieldUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handleSignout() {
        const request = new Request("/api/logout", {
            method: 'POST',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            mode: 'same-origin',// Do not send CSRF token to another domain.
        })

        fetch(request).then((response) => {
            if (response.ok) {
                userInRoom()
                console.log('Loggedout')
            }
        })
    }

    function renderSignout() {
        return (
            <Grid item xs={2} align="center">
                <Button variant="contained" color="secondary" onClick={handleSignout}>
                    Signout
                </Button>
            </Grid>
        )
    }

    function renderContacts() {
        return (
            <Grid item xs={2} align="center">
                <Button variant="contained" color="default" to="/contacts" component={Link}>
                    Contacts
                </Button>
            </Grid>
        )
    }

    function userInRoom() {
        const request = new Request("/api/userinroom", {
            method: 'GET',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            mode: 'same-origin',// Do not send CSRF token to another domain.
        })

        fetch(request).then((response) => {
            if (response.status === 200) {
                console.log("inside response.ok of user in room")
                setLogged(true)
            } else {
                setLogged(false)
            }
        })
    }

    useEffect(() => {
        csrftoken = getCookie('csrftoken');
        console.log("csrf_token::" + csrftoken);
        userInRoom()
    })

    return (
        <div className="Login">
            < Grid container spacing={1} >
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Login
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
                    <Password className="_pass" _onChange={handleTextFieldPasswordChange} clear={clear} />
                </Grid>
                <Grid iteam xs={3}></Grid>
                <Grid item xs={2} align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Signin
                    </Button>
                </Grid>
                {logged ? renderContacts() : null}
                {logged ? renderSignout() : null}
                <Grid iteam xs={3}></Grid>
                {useEffect(() => {
                    console.log("logged_near_grid::" + logged)
                }, [logged])}
            </Grid >
        </div>
    );
}