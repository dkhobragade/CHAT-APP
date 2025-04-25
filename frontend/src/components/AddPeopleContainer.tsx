import ChatHeader from './ChatHeader'
import Email from '../lowLevelComponents/EmailInput'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'

export const AddPeopleContainer = () =>
{
    const [ email, setEmail ] = useState<string>( '' )
    const [ isBtnDisable, setIsBtnDisable ] = useState<boolean>( false )


    const sendEmail = async ( e: React.FormEvent<HTMLFormElement> ) =>
    {
        e.preventDefault()
        if ( !email )
        {
            toast.error( "Please enter the email" )
            return
        }
        setIsBtnDisable( true )
        try
        {
            await axiosInstance.post( '/send-email', { email } )
            toast.success( "Send Email Successfully" )
            setEmail( ' ' )
            setIsBtnDisable( false )
        }
        catch ( err )
        {
            toast.error( "Error while sending email. Please Try again" )
        }
    }

    const onEmailChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
    {
        setEmail( e.target.value )
    }

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader showImg={ false } className='justify-end p-1' />
            <div className="bg-inherit  p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Connect Instantly</h1>
                <p className="text-center text-gray-600 mb-6">Just enter their email or phone number to connect!</p>

                <form id="connectForm" className="space-y-4" onSubmit={ sendEmail }>
                    <div>
                        <label htmlFor="contactInput" className="block text-sm font-medium text-gray-700 " style={ { width: '100%' } }>Email or Phone Number</label>
                        <Email value={ email } legend={ '' } placeholder="Enter the email" onchange={ onEmailChange } />
                    </div>
                    <button
                        type="submit"
                        disabled={ isBtnDisable }
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        { isBtnDisable ? "Sending" : 'Connect Now' }
                    </button>
                </form>
            </div>

        </div>
    )
}
