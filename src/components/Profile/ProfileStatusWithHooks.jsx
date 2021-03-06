import React, { useEffect, useState } from "react";


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    } ,[props.status])


    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <div> <b>Status:</b>
            {!editMode ?
                <div>
                    <span onDoubleClick={activateEditMode}> {props.status || "-------------"} </span>
                </div>

                :
                <div>
                    <input
                        autoFocus={true} onChange={onStatusChange} value={status} onBlur={deActivateEditMode}>
                    </input>
                </div>}
        </div>


    )
}



export default ProfileStatusWithHooks