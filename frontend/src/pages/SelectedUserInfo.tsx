import { Phone, Video, Image, IndianRupee } from 'lucide-react'
import { useMessageStore } from '../store/useMessageStore'
import { useState } from 'react'

export const SelectedUserInfo = () =>
{
    const { selectedUser, messages, clearMessages, setOpenSelectedUserInfo } = useMessageStore()
    const [ showMedia, setShowMedia ] = useState<boolean>( false )

    const onClickClearChat = () =>
    {
        setOpenSelectedUserInfo( false )
        // clearMessages()
    }

    const onClickShowMedia = () =>
    {
        setShowMedia( !showMedia )
    }

    const renderShowMedia = () =>
    {
        const mediaImg = messages.filter( mes => mes.image );

        return <div className='bg-white w-full h-50 overflow-y-auto py-3'>
            { mediaImg.length > 0 ? (
                <div className='grid grid-cols-3 gap-2 p-2'>
                    { mediaImg.map( ( mes, index ) => (
                        <div key={ index } className='w-full h-45 overflow-hidden rounded-md'>
                            <img
                                src={ mes.image }
                                alt="media"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) ) }
                </div>
            ) : (
                <div className='flex justify-center items-center h-45'>
                    <p className='text-gray-500 font-medium'>No media found</p>
                </div>
            ) }
        </div>
    }

    return (
        <div className='h-full pt-20'>
            <div className='max-w-2xl mx-auto p-4 py-8'>
                <div className='bg-base-300 rounded-xl p-6 space-y-8'>
                    <div className='justify-center grid'>
                        <div className='grid justify-center py-1 '>
                            <p className='font-semibold'>Contact Info</p>
                        </div>
                        <img
                            src={ selectedUser.profilePic || "/avatar.png" }
                            alt="Profile"
                            className="size-32 rounded-full object-cover border-4 justify-self-center "
                        />
                        <div className='grid justify-center py-5 '>
                            <p className='font-semibold'>{ selectedUser.fullName }</p>
                        </div>
                        <div className='flex justify-around cursor-pointer gap-2'>
                            <Phone size={ 20 } className='w-15 h-12 p-1 bg-white ' color="#0de74f" strokeWidth={ 1 } />
                            <Video size={ 20 } className='w-15 h-12  bg-white' color="#0de74f" strokeWidth={ 1 } />
                            <IndianRupee size={ 20 } className='w-15 h-12  bg-white' color="#0de74f" strokeWidth={ 1 } />
                        </div>
                    </div>
                    <div className='bg-white p-2'>
                        <p className='font-semibold'>Available</p>
                        <p className='font-medium'>{ selectedUser.updatedAt.split( "T" )[ 0 ] }</p>
                    </div>

                    <div className='bg-white p-2 grid cursor-pointer' onClick={ onClickShowMedia }>
                        <div className='flex gap-2'>
                            <Image size={ 20 } color="#0de74f" strokeWidth={ 1 } />
                            <p>Media, Links and docs</p>
                        </div>
                        <div>
                            { showMedia && renderShowMedia() }
                        </div>
                    </div>

                    <div className='bg-white p-2 cursor-pointer' onClick={ onClickClearChat }>
                        <p className='font-semibold text-red-500'>Clear Chat</p>
                    </div>
                    <div className='bg-white p-2 cursor-pointer'>
                        <p className='font-semibold text-red-500'>{ `Block ${ selectedUser.fullName }` }</p>
                    </div>
                </div>
            </div>
        </div >
    )
}
