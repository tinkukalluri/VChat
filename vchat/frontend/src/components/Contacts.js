import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { TextField, Grid, Button, ButtonGroup, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";


import css from "./css/contacts.css";
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

export default function Contacts(props) {
    const [myId, setMyId] = useState(-1)
    const [friends, setFriends] = useState({})

    useEffect(() => {
        console.log("in use effect of COntacts.js")
        csrftoken = getCookie('csrftoken');
        console.log("csrf_token::" + csrftoken);
        fetchMyId()
        fetchFriendsList();
    })

    function fetchMyId() {
        const request = new Request("/api/myid", {
            method: 'POST',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            mode: 'same-origin',// Do not send CSRF token to another domain.
            body: JSON.stringify({

            })
        })

        fetch(request).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("fetchMyId::" + data);
        })
    }

    function fetchFriendsList() {
        const request = new Request("/api/friends", {
            method: 'POST',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            mode: 'same-origin',// Do not send CSRF token to another domain.
            body: JSON.stringify({

            })
        })

        fetch(request).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("fetchFriendList::" + data);
        })
    }


    return (
        <div className="container">
            <h1>I the contacts page </h1>
        </div>
    )
}