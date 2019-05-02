import React from 'react';

function ChatList({messages}) {

    const messageItems = messages.map((message, i) => {
        return(
            <p key={i}>{message}</p>
        )
    })
    return(
        <div>
            {messageItems}
        </div>
    )
}



export default ChatList;