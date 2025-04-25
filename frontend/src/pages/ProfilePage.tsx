import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { BadgeInfo, Camera, Mail, User } from 'lucide-react'
import Input from '../lowLevelComponents/Input'
import toast from 'react-hot-toast'
import Button from '../lowLevelComponents/Button'

export const ProfilePage = () =>
{

    const { updateProfile, isUpdatingProfile, authUser, updateFullName, aboutInfomation } = useAuthStore()
    const [ selectedImg, setSelectedImg ] = useState<string | any>( null )
    const [ fullName, setFullName ] = useState<string>( authUser?.fullName )
    const [ aboutInfo, setAboutInfo ] = useState<string>( authUser.about )


    const handleImageUpload = async ( e: any ) =>
    {
        const file = e.target.files[ 0 ]
        if ( !file ) return

        const reader = new FileReader()
        reader.readAsDataURL( file )

        reader.onload = async () =>
        {
            const base64Img = reader.result
            setSelectedImg( base64Img )
            await updateProfile( { profilePic: base64Img } )
        }


    }

    const handleNameChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
    {
        setFullName( e.target.value )
    }

    const handleAboutInfo = ( e: React.ChangeEvent<HTMLInputElement> ) =>
    {
        setAboutInfo( e.target.value )
    }

    const onClickSubmit = async () =>
    {

        if ( !fullName.trim() )
        {
            toast.error( "Please enter the FullName" )
            return
        }
        if ( fullName.trim() !== authUser.fullName )
        {

            await updateFullName( { fullName: fullName } )
        }

        if ( aboutInfo !== authUser.about )
        {
            await aboutInfomation( { about: aboutInfo } )
        }
    }

    return (
        <div className='h-full pt-20'>
            <div className='max-w-2xl mx-auto p-4 py-8'>
                <div className='bg-base-300 rounded-xl p-6 space-y-8'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-semibold'>Profile</h1>
                        <p className='mt-2'>Your Profile Infromation</p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={ selectedImg || authUser.profilePic || "/avatar.png" }
                                alt="Profile"
                                className="size-32 rounded-full object-cover border-4 "
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={ `
                                    absolute bottom-0 right-0
                                    bg-base-content hover:scale-105
                                    p-2 rounded-full cursor-pointer
                                    transition-all duration-200
                                    ${ isUpdatingProfile ? "animate-pulse pointer-events-none" : "" }
                                    `}
                            >
                                <Camera className="w-5 h-5 text-base-200" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={ handleImageUpload }
                                    disabled={ isUpdatingProfile }
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            { isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo" }
                        </p>
                    </div>

                    <div className='space-y-6'>
                        <div className='space-y-1.5'>
                            <div className='text-sm text-zinc-600 flex items-center gap-2'>
                                <User className='w-4 h-4' />
                                FullName
                            </div>
                            <Input noIcon value={ fullName } placeholder="FullName" onchange={ handleNameChange } className='px-4 py-2.5 bg-base-200 rounded-lg border' />
                        </div>

                        <div className='space-y-1.5'>
                            <div className='text-sm text-zinc-600 flex items-center gap-2'>
                                <BadgeInfo className='w-4 h-4' />
                                About
                            </div>
                            <Input value={ aboutInfo } placeholder='About' onchange={ handleAboutInfo } noIcon className='px-4 py-2.5 bg-base-200 rounded-lg border' />
                        </div>

                        <div className='space-y-1.5'>
                            <div className='text-sm text-zinc-600 flex items-center gap-2'>
                                <Mail className='w-4 h-4' />
                                Email Address
                            </div>
                            <Input isDisable value={ authUser?.email } noIcon className='px-4 py-2.5 bg-base-200 rounded-lg border' />
                        </div>
                        <Button isDisable={ fullName.trim() === authUser?.fullName && aboutInfo.trim() === authUser.about } onChange={ onClickSubmit } text="Submit" />
                    </div>

                    <div className='mt-6 bg-base-300 rounded-xl p-6'>
                        <h2 className='text-lg font-medium mb-4'>Account Information</h2>
                        <div className='space-y-3 text-sm'>
                            <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                                <span>Member Since</span>
                                <span>{ authUser.createdAt?.split( "T" )[ 0 ] }</span>
                            </div>
                            <div className='flex items-center justify-between py-2'>
                                <span>Account Status</span>
                                <span className='text-green-500'>Active</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
