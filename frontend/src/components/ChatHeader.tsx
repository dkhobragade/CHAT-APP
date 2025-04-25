import { useMessageStore } from '../store/useMessageStore';
import { X } from 'lucide-react';

interface Props
{
    showImg?: boolean,
    className?: string
}

const ChatHeader = ( { showImg = true, className = 'justify-between' }: Props ) =>
{
    const { selectedUser, setSelectedUser, setAddPeople } = useMessageStore();


    const onClickClose = () =>
    {
        setSelectedUser( null )
        setAddPeople( false )
    }

    return (
        <div className="p-3 border-b border-base-300">
            <div className={ `flex items-center ${ className }` }>
                { showImg &&
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="size-10 rounded-full relative">
                                <img src={ selectedUser.profilePic || "/avatar.png" } alt={ selectedUser.fullName } />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium">{ selectedUser.fullName }</h3>
                            <p className="text-sm text-base-content/70">
                                {/* { onlineUsers.includes( selectedUser._id ) ? "Online" : "Offline" } */ }
                            </p>
                        </div>
                    </div>
                }
                <button className={ className } onClick={ onClickClose }>
                    <X />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader