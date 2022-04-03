import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { TextField, Grid, Button, ButtonGroup, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";


import css from "./css/contacts.css";
import "./css/msgbox.css";


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

// Global variables
var csrftoken = ""
var count = 0;
var _contact_id = -1;
var scrolled = false;

export default function Contacts(props) {
    const [myId, setMyId] = useState(-1)
    const [friends, setFriends] = useState({})
    const [fetchmsg, setFetchMsg] = useState({})
    const [sortedMsg, setSortedMsg] = useState({})
    const [inputText, setInputText] = useState('')
    const [contact_id, setContactId] = useState(-1)
    const [updateMsgs, setUpdateMsgs] = useState(false)

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
        console.log(typeof e.currentTarget)
        if (typeof e.currentTarget !== 'undefined') {
            console.log("got into e.currentTarget.value")
            _contact_id = e.currentTarget.value
            setContactId(e.currentTarget.value);
        }
        const request = new Request("/api/fetchmsgs", {
            method: 'POST',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            mode: 'same-origin',// Do not send CSRF token to another domain.
            body: JSON.stringify({
                "user_id": myId,
                'contact_id': _contact_id
            })
        })
        fetch(request).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            setFetchMsg(data);
            setUpdateMsgs(false);
            scrolled = false;
            // msgIdSort()
        })
    }

    useEffect(() => {
        msgIdSort()
    }, [fetchmsg])

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


    function renderContactsButtons() {
        var btn = []
        console.log("keys::" + Object.keys(friends))
        console.log("keys::" + Object.values(friends))
        var entries = Object.entries(friends)
        console.log(entries);
        for (var friend in entries) {
            // console.log(friend)
            btn.push(
                <button class="btn-contacts" value={entries[friend][0]} onClick={handleContactButton}>
                    <span><img src="../../images/4_c.jpeg" alt="photo" srcset="" /></span>
                    <span class="btn-text">{entries[friend][1]}</span>
                </button>
            );

        }
        console.log("btn", btn)
        return <>
            {btn}
        </>;
    }


    function dateTimeSort() {

    }

    function handleChangeInput(e) {
        let input = e.target.value;
        setInputText(input)
        // console.log(input)
    }

    function handleTextSubmit() {
        console.log("clicked......................")
        const request = new Request("/api/inputtext", {
            method: 'POST',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            mode: 'same-origin',// Do not send CSRF token to another domain.
            body: JSON.stringify({
                "user_id": myId,
                'contact_id': contact_id,
                "text": inputText

            })
        })
        fetch(request).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                conosle.log('looks like something went wrong')
            }
        }).then((data) => {
            console.log(data)
            handleContactButton({})
            setInputText("")
            setUpdateMsgs(true)
        })
    }

    function updateScroll() {
        var element = document.getElementById("yourDivID");
        element.scrollTop = element.scrollHeight;
    }

    setInterval(updateScroll, 1000);

    function updateScroll() {
        if (!scrolled) {
            var element = document.getElementById("scrollBottom");
            element.scrollTop = element.scrollHeight;
        }
    }

    $("#scrollBottom").on('scroll', function () {
        scrolled = true;
    });

    // setInterval(function () {
    //     const out = document.getElementById("scrollBottom")
    //     // allow 1px inaccuracy by adding 1
    //     const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1
    //     // scroll to bottom if isScrolledToBottom is true
    //     if (isScrolledToBottom) {
    //         out.scrollTop = out.scrollHeight - out.clientHeight
    //     }
    // }, 500)


    // useEffect(() => {
    //     setUpdateMsgs(false)
    // }, [updateMsgs])

    function onkeyup(e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }
    }


    //the below doesnt work because the DOM object has not yet created so we cannot have this
    // but u can write them inside any function as they wont get executed right away:
    // document.getElementById('#chat-message-input').focus();
    // document.getElementById('#chat-message-input').onkeyup = function (e) {
    //     if (e.keyCode === 13) {  // enter, return
    //         document.querySelector('#chat-message-submit').click();
    //     }
    // };

    return (
        <div>
            {/* <Grid className="chat-box" container spacing={1} >
                <Grid item xs={4}> */}
            <div className="chat-box">
                <div className="grid-container">
                    <div class="contact-container">
                        {renderContactsButtons()}
                    </div>
                    {/* </Grid>
                <Grid item xs={8} > */}
                    <div className="msg-container" id="scrollBottom">
                        <MsgBox msgs={sortedMsg} myid={myId} />
                    </div>
                </div>
                <div className="text-input-container">
                    <input type="text" id="chat-message-input" focus onKeyUp={onkeyup} className="inputtxt container" name="msg" value={inputText} onChange={handleChangeInput} />
                    <input type="submit" id="chat-message-submit" onClick={handleTextSubmit} />
                </div>
            </div>
            {/* </Grid>
            </Grid> */}
        </div>
    )
}