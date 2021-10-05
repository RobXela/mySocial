import classes from './Messages.module.css'
import Message from './Message'
import DialogueItem from './DialogueItem'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

const Messages = (props) => {

    let messageElements = props.messages.map(messages => <Message text={messages.text} />);
    let dialoguesElements = props.dialogues.map(dialogues => <DialogueItem name={dialogues.name} />);


    let addNewMessage = (values) => {
        props.addNewMessage(values.newMessageBody)
    }


    return (
        <div className={classes.wrapper}>
            <div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

            <div className={classes.dialoguesList}>
                {dialoguesElements}
            </div>

            <div className={classes.dialogue}>
                {messageElements}
            </div>

        </div>
    )
}


const AddMessageForm = (props) => {
    return <div>
        <form onSubmit={props.handleSubmit} >
            <Field component='textarea' name='newMessageBody' placeholder='Type here...'/>
            <button>Add</button>
        </form>
    </div>
}

const AddMessageFormRedux = reduxForm({form: 'dialogueAddMessageForm'})(AddMessageForm)

export default Messages;