import React, { useState, useEffect } from "react";
import { TextField, Grid, Button, ButtonGroup, Typography, FormControlLabel, Checkbox } from "@material-ui/core";

import css from "./css/homepage.css"
import Login from "./Login.js";
import SignUp from "./SignUp.js"

export default function HomePage(props) {
    const [login, setLogin] = useState(true)

    function loginButtonPressed(e) {
        setLogin(true)
    }

    function signupButtonPressed(e) {
        setLogin(false);
    }


    return (
        <div>
            < Grid container spacing={1} >
                <Grid iteam xs={4}>
                </Grid>
                <Grid item xs={2} align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={loginButtonPressed}
                    >
                        Login
                    </Button>
                </Grid>
                {/* <Grid iteam xs={1}>
                </Grid> */}
                <Grid item xs={2} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={signupButtonPressed}
                    >
                        Signup
                    </Button>
                    <Grid iteam xs={4}>
                    </Grid>
                </Grid>
                <Grid iteam xs={12}>
                    {login ? <Login /> : <SignUp />}
                </Grid>
            </Grid>
        </div >
    );
}