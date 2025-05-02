import { useEffect } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import SidebarSkeleton from './skeleton/SidebarSkeleton'
import { CircleFadingPlus, User } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const Sidebar = () =>
{

    const { getUser, users, selectedUser, setSelectedUser, isUserLoading, setAddPeople, setOpenSelectedUserInfo, setOpenAddStatus } = useMessageStore()
    const { onlineUsers } = useAuthStore()

    useEffect( () =>
    {
        getUser()
    }, [ getUser ] )

    const onClickAddPeople = () =>
    {
        setOpenSelectedUserInfo( false )
        setOpenAddStatus( false )
        setSelectedUser( null )
        setAddPeople( true )
    }


    if ( isUserLoading ) return <SidebarSkeleton />

    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex gap-3'>
                        <User className='size-6' />
                        <button className="btn btn-dash btn-xs btn-info" onClick={ onClickAddPeople }>Invite a friend</button>
                    </div>
                    <div className="tooltip tooltip-right cursor-pointer" data-tip="Add Status" onClick={ () => setOpenAddStatus( true ) }>
                        <CircleFadingPlus />
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto w-full py-3">
                { users.map( ( user ) => (
                    <button
                        key={ user._id }
                        onClick={ () => { setSelectedUser( user ), setOpenSelectedUserInfo( false ), setOpenAddStatus( false ) } }
                        className={ `
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${ selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : "" }
            `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={ user.profilePic || "/avatar.png" }
                                alt={ user.name }
                                className="size-12 object-cover rounded-full"
                            />
                            { onlineUsers.includes( user._id ) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500
                  rounded-full ring-2 ring-zinc-900"
                                />
                            ) }
                        </div>

                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{ user.fullName }</div>
                            <div className="text-sm text-zinc-400">
                                { onlineUsers.includes( user._id ) ? "Online" : "Offline" }
                            </div>
                        </div>
                    </button>
                ) ) }

                { users.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                ) }
            </div>
        </aside>
    )
}

export default Sidebar