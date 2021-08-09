import React from 'react'

export default function ErrorMessage({message}) {
    return (
        <div>
            { 
                message &&  <span className="error">{message}</span> 
            }
        </div>
    )
}
