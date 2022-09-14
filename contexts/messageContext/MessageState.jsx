import React from 'react'
import MessageContext from './MessageContext'

const MessageState = ({children}) => {


    // actions on messageState

  return (
    <MessageContext.Provider>
        {children}
    </MessageContext.Provider>
  )
}

export default MessageState