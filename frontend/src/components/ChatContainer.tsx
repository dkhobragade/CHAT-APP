import { useEffect } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkelton from './skeleton/MessageSkelton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () =>
{
    const { messages, getMessages, isMessageLoading, selectedUser, subscribeNewMessage, unSubscribeNewMessage } = useMessageStore()
    const { authUser } = useAuthStore()

    useEffect( () =>
    {
        getMessages( selectedUser._id )
        subscribeNewMessage()

        return () => unSubscribeNewMessage()
    }, [ selectedUser._id, getMessages, unSubscribeNewMessage, subscribeNewMessage ] )

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
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                { messages.map( ( mess ) => (
                    <div key={ mess._id } className={ `chat ${ mess.senderId === authUser._id ? "chat-end" : "chat-start" }` }>
                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full border'>
                                <img src={ mess.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png" } alt="Profile Pic" />
                            </div>
                        </div>
                        <div className='chat-header mb-1'>
                            <time className='text-xs opacity-50 ml-1'>{ formatMessageTime( mess.createdAt ) }</time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            { mess.image && (
                                <img
                                    src={ mess.image }
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            ) }
                            { mess.text && <p>{ mess.text }</p> }
                        </div>
                    </div>
                ) ) }

            </div>
            <MessageInput />
        </div>
    )
}

export default ChatContainer