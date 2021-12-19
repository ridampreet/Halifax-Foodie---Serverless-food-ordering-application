import React, { useEffect } from 'react';
import { useState, setState } from 'react';
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

export const Rest = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const int = setInterval(() => {
            receive();
        }, 5000)
        return () => clearInterval(int)
    }, [])
    
    const receive = async () => {
        const userId = localStorage.getItem("userId");
        const {data} = await axios.post("https://back-ion5wdstsq-uc.a.run.app/receive", {
            subscription: "rest"
        });
        const msg = JSON.parse(data.message)
        console.log(msg);
        if(msg && msg.id !== userId) {
            setMessages((oldMsg) => [...oldMsg, msg]);
        }
    }

    const send = async () => {
        const userId = localStorage.getItem("userId");
        if (message == "") {
            return;
        }
        try {
            var body = {
                message: {
                    id: userId,
                    timestamp: +new Date(),
                    message: message
                },
                topic: "chat",
            }
            axios({
                method: 'post',
                url: 'https://back-ion5wdstsq-uc.a.run.app/send',
                data: body
            }).then((resp)=>{
                console.log("response", resp);
                setMessages((oldmsg)=> [...oldmsg,body.message])
                setMessage("");
            }).catch((err)=>{
                console.log(err);
            })

        }
        catch (err) {
            alert(err);
          }
        
    
    }


    return (
        <div>
            <h1>Restaurant</h1>
            <div>
                <TextField
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></TextField>
                <Button onClick={() => send()}>Send</Button>
            </div>
            {messages.map((msg) => <div key={msg.timestamp}>{msg.message}</div>)}
        </div>
    )
}

export default Rest;
