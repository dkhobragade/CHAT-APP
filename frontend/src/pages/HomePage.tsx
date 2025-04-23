import { useMessageStore } from '../store/useMessageStore'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { NoChatSelected } from '../components/NoChatSelected'

export const HomePage = () =>
{

    const { selectedUser } = useMessageStore()

    return (
        <div className='w-full h-screen bg-base-200'>
            <div className='flex pt-20 px-4'>
                <div className='bg-base-100 rounded-lg shadow-xl w-full  h-[calc(105vh-8rem)]'>
                    <div className='flex w-full h-full rounded-lg overflow-hidden'>
                        <Sidebar />
                        { !selectedUser ? <NoChatSelected /> : <ChatContainer /> }
                    </div>
                </div>
            </div>
        </div>
    )
}
