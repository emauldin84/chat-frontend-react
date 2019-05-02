import React from 'react';

function ChatForm({text, handleChange, handleSend}) {
    return(
        <form onSubmit={ (e) => {
            e.preventDefault();
            handleSend();
            }}>
            <input value={text} onChange={(e) => {
                handleChange(e.target.value);
            }}
            />

            <button>Send >></button>
        </form>
    )
}


export default ChatForm;