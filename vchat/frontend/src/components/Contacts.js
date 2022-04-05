import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { TextField, Grid, Button, ButtonGroup, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";


import css from "./css/contacts.css";
import "./css/msgbox.css";
import './css/contacts_align.css'

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
var chatSocket = null;
count

chatSocket = new WebSocket(
    'ws://'
    + window.location.host + '/'
);

export default function Contacts(props) {
    const [myId, setMyId] = useState(-1)
    const [friends, setFriends] = useState({})
    const [fetchmsg, setFetchMsg] = useState({})
    const [sortedMsg, setSortedMsg] = useState({})
    const [inputText, setInputText] = useState('')
    const [contact_id, setContactId] = useState(-1)
    const [updateMsgs, setUpdateMsgs] = useState(false)
    const [websocketconn, setWebSocketConn] = useState(false)
    const [searchUser, setSearchUser] = useState([])



    useEffect(() => {
        // because we only want this to happen once when the component is
        // mounted and not everytime the component is updated
        if (count === 0) {
            //console.log("in use effect of COntacts.js")
            csrftoken = getCookie('csrftoken');
            //console.log("csrf_token::" + csrftoken);
            count++;

            fetchMyId()
            fetchFriendsList();
            if (chatSocket != null) {
                console.log("in not null")
            }

        }
    })

    useEffect(() => {
        console.log("websocketconn::" + websocketconn)
        console.log('myId:' + myId)
        if (websocketconn && myId != -1) {
            console.log("executing ")
            _send(JSON.stringify({
                'room_name': myId
            }));
        }
    }, [websocketconn, myId]);


    let _send = function (message) {
        _waitForConnection(function () {
            chatSocket.send(message);
        }, 1000);
    };

    let _waitForConnection = function (callback, interval) {
        if (chatSocket.readyState === 1) {
            callback();
        } else {
            var that = this;
            // optional: implement backoff for interval here
            setTimeout(function () {
                _waitForConnection(callback, interval);
            }, interval);
        }
    };




    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log("message recieved", data);
        if (typeof data['conn_status'] !== 'undefined') {
            console.log("inside conn_status", data.conn_status);
            setWebSocketConn(true)
        } else {
            console.log(data)
            delete data['type']
            let tempMsg = { ...fetchmsg, ...data }
            //console.log("tempMsg", tempMsg);
            console.log("after mssg received and conncatenated::", tempMsg)
            setFetchMsg(tempMsg)
        }
    };


    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };


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
            //console.log("fetchMyId::" + data.myId);
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
            //console.log("my friends list", data)
            setFriends(data)
        })
    }



    function handleContactButton(e) {
        //console.log(typeof e.currentTarget)
        if (typeof e.currentTarget !== 'undefined') {
            //console.log("got into e.currentTarget.value")
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
            //console.log(data);
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
        //console.log("msgIdSort before sort", entries)
        entries.sort((a, b) => {
            return a[0] - b[0]
            // return b[0] - a[0]
        })
        data = Object.fromEntries(entries)
        //console.log("after sorting object", data)
        setSortedMsg(data)
        scrolled = false
    }


    function renderContactsButtons() {
        var btn = []
        //console.log("keys::" + Object.keys(friends))
        //console.log("keys::" + Object.values(friends))
        var entries = Object.entries(friends)
        //console.log(entries);
        for (var friend in entries) {
            // //console.log(friend)
            // btn.push(
            //     <button class="btn-contacts" value={entries[friend][0]} onClick={handleContactButton}>
            //         <span><img src="../../images/4_c.jpeg" alt="photo" srcset="" /></span>
            //         <span class="btn-text">{entries[friend][1]}</span>
            //     </button>
            // );
            btn.push(
                <li>
                    <button class="btn-contacts" value={entries[friend][0]} onClick={handleContactButton}>
                        <span><img src="../../images/4_c.jpeg" alt="photo" srcset="" /></span>
                        <span class="btn-text">{entries[friend][1]}</span>
                    </button>
                </li>
            );

        }
        //console.log("btn", btn)
        return <>
            {btn}
        </>;
    }


    function dateTimeSort() {

    }

    function handleChangeInput(e) {
        let input = e.target.value;
        setInputText(input)
        // //console.log(input)
    }

    function handleTextSubmit() {
        //console.log("clicked......................")
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
            //console.log(data)
            // so we concatinated two objects using spread operator
            // https://www.delftstack.com/howto/javascript/javascript-append-to-object/
            let tempMsg = { ...fetchmsg, ...data.msg_data }
            //console.log("tempMsg", tempMsg);
            setFetchMsg(tempMsg)
            scrolled = false;
            // handleContactButton({})
            chatSocket.send(JSON.stringify({
                ...data.msg_data
            }));
            setInputText("")
            setUpdateMsgs(true)
        })
    }

    // function updateScroll() {
    //     var element = document.getElementById("scrollBottom");
    //     element.scrollTop = element.scrollHeight;
    // }



    function updateScroll() {
        if (!scrolled) {
            var element = document.getElementById("scrollBottom");
            element.scrollTop = element.scrollHeight;
        }
    }

    setInterval(updateScroll, 1000);

    $("#scrollBottom").on('scroll', function () {
        scrolled = true;
    });




    // useEffect(() => {
    //     setUpdateMsgs(false)
    // }, [updateMsgs])

    function onkeyup(e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }
    }



    function handleAddFriendButton(e) {
        let btn_value = e.currentTarget.value;
        console.log("btn-value", btn_value);
        const request = new Request("/api/addfriend", {
            method: 'POST',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            mode: 'same-origin',// Do not send CSRF token to another domain.
            body: JSON.stringify({
                user_id: myId,
                customer_id: btn_value
            })
        })
        fetch(request).then((response) => {
            return response.json()
        }).then(data => {
            console.log("data from add", data)
            if (!data['added']) {

            } else {
                delete data['added']
                let temp_friends = { ...friends, ...data }
                setFriends(temp_friends)
            }
        })
    }


    function handleSearch(e) {
        let input = e.target.value;
        const request = new Request("/api/searchuser", {
            method: 'POST',
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            mode: 'same-origin',// Do not send CSRF token to another domain.
            body: JSON.stringify({
                search_user: input
            })
        })
        let list = []
        fetch(request).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            if (Object.keys(data).length === 0) {
                setSearchUser(list)
            } else {
                let keys = Object.keys(data)
                let key_len = keys.length
                var friends_keys = Object.keys(friends)
                // console.log("search_keys", keys)
                // console.log("friends_keys", friends_keys)
                for (let i = 0; i < key_len; i++) {
                    let is_friend = false;
                    // console.log("indexOF", friends_keys.indexOf([keys[i]]))
                    if (friends_keys.indexOf(keys[i]) == -1) {
                        // console.log(typeof keys[i])
                        console.log("not friends")
                    } else {
                        is_friend = true;
                        console.log("are friends")
                    }
                    list.push(

                        <div className="user-request-result _d-flex" >
                            <div className="user-name">{data[keys[i]]}</div>

                            {is_friend ? null : <button className="user-add-button" value={keys[i]} onClick={handleAddFriendButton}>+add</button>}

                        </div >
                    )
                }
                setSearchUser(list)
                console.log("list data", list);
            }
        })

    }

    return (
        <div className="chat-box">
            <nav class="navbar navbar-expand-lg navbar-light bg-dark _z-index">
                <div class="container-fluid">
                    <a class="navbar-brand text-white" href="#">Vchat</a>
                    <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item text-white">
                                <a class="nav-link text-white active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <div class="search-box">
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Add friend" aria-label="Search" onChange={handleSearch} />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                            <div class="results bg-dark">
                                {searchUser}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* vertical nav bar implementation */}
            <nav class="navbar-primary">
                <a href="#" class="btn-expand-collapse">Contacts<span></span></a>
                <ul class="navbar-primary-menu">
                    {renderContactsButtons()}
                </ul>
            </nav>
            <div className="text-input-container">
                <div className="msg-container" id="scrollBottom">
                    <MsgBox msgs={sortedMsg} myid={myId} />
                </div>
                <div className="text-input-field d-flex">
                    <input type="text" id="chat-message-input" focus onKeyUp={onkeyup} className="inputtxt container" name="msg"
                        value={inputText} onChange={handleChangeInput} />
                    <input type="submit" id="chat-message-submit" onClick={handleTextSubmit} />
                </div>
            </div>
        </div>
    )
}