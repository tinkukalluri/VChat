import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { TextField, Grid, Button, ButtonGroup, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";


import css from "./css/contacts.css";


import MsgBox from "./MsgBox.js"



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
var count = 0;
export default function Contacts(props) {
    const [myId, setMyId] = useState(-1)
    const [friends, setFriends] = useState({})
    const [fetchmsg, setFetchMsg] = useState({})
    const [sortedMsg, setSortedMsg] = useState({})

    useEffect(() => {
        // because we only want this to happen once when the component is
        // mounted and not everytime the component is updated
        if (count === 0) {
            console.log("in use effect of COntacts.js")
            csrftoken = getCookie('csrftoken');
            console.log("csrf_token::" + csrftoken);
            fetchMyId()
            fetchFriendsList();
            count++;
        }
    })

    function fetchMyId() {
        const request = new Request("/api/myid", {
            method: 'POST',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            mode: 'same-origin',// Do not send CSRF token to another domain.
            body: JSON.stringify({

            })
        })
        // JSON.stringfy() parses onject into json text.
        // JSON.parse() parses json text into Object.
        fetch(request).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("fetchMyId::" + data.myId);
            setMyId(data.myId);
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
            console.log("my friends list", data)
            setFriends(data)
        })
    }

    function handleContactButton(e) {
        var contact_id = e.currentTarget.value;
        const request = new Request("/api/fetchmsgs", {
            method: 'POST',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            mode: 'same-origin',// Do not send CSRF token to another domain.
            body: JSON.stringify({
                "user_id": myId,
                'contact_id': contact_id
            })
        })
        fetch(request).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            setFetchMsg(data);
            // msgIdSort()
        })
    }

    useEffect(() => {
        msgIdSort()
    }, [fetchmsg])

    function renderContactsButtons() {
        var btn = []
        console.log("keys::" + Object.keys(friends))
        console.log("keys::" + Object.values(friends))
        var entries = Object.entries(friends)
        console.log(entries);
        for (var friend in entries) {
            // console.log(friend)
            btn.push(

                <Button className="btn-contact _MuiButton-outlinedSizeLarge" onClick={handleContactButton}
                    variant="outlined"
                    color="primary"
                    value={entries[friend][0]}
                    size="large"
                // key={friend[1]}
                >{entries[friend][1]}</Button>);

        }
        console.log("btn", btn)
        return <>
            {btn}
        </>;
    }


    function dateTimeSort() {

    }
    //for time being i m using msgIdSort to sort my messages rathan then dateTimeSort()
    function msgIdSort() {
        let data = fetchmsg
        let entries = Object.entries(data)
        console.log("msgIdSort before sort", entries)
        entries.sort((a, b) => {
            return a[0] - b[0]
            // return b[0] - a[0]
        })
        data = Object.fromEntries(entries)
        console.log("after sorting object", data)
        setSortedMsg(data)
    }




    return (
        <div className="container">
            <Grid container spacing={1} >
                <Grid item xs={4}>
                    {renderContactsButtons()}
                </Grid>
                <Grid item xs={8}>
                    <MsgBox msgs={sortedMsg} myid={myId} />
                </Grid>
            </Grid>
        </div>
    )
}