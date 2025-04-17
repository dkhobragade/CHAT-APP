import React, { useEffect } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import Loading from '../lowLevelComponents/Loading'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkelton from './skeleton/MessageSkelton'

const ChatContainer = () =>
{
    const { messages, getMessages, isMessageLoading, selectedUser } = useMessageStore()

    useEffect( () =>
    {
        getMessages( selectedUser._id )
    }, [ selectedUser._id, getMessages ] )

    if ( isMessageLoading )
    {
        return <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <MessageSkelton />
            <MessageInput />

        </div>
    }

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <p>Message</p>
            <MessageInput />
        </div>
    )
}

export default ChatContainer