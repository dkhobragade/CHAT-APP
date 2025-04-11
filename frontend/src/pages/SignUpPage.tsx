import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import Input from '../lowLevelComponents/Input'
import Email from '../lowLevelComponents/EmailInput'
import Password from '../lowLevelComponents/PasswordInput'
import toast from 'react-hot-toast'

export const SignUpPage = () =>
{

    const [ formData, setFormData ] = useState( {
        fullName: '',
        email: '',
        password: ''
    } )

    const { isSigningUp, signup } = useAuthStore()

    const handleSubmit = ( e: { preventDefault: () => void } ) =>
    {
        e.preventDefault()
        signup( formData )
    }

    const onChangeFullName = ( e: React.ChangeEvent<HTMLInputElement> ) =>
    {
        if ( !e.target.value.trim() ) toast.error( "Enter the fullName" )
        setFormData( { ...formData, fullName: e.target.value } )
    }

    const onChangeEmail = ( e: React.ChangeEvent<HTMLInputElement> ) =>
    {
        if ( !e.target.value.trim() ) toast.error( "Enter the Email" )
        setFormData( { ...formData, email: e.target.value } )
    }

    const onChangePassword = ( e: React.ChangeEvent<HTMLInputElement> ) =>
    {
        if ( !e.target.value.trim() ) toast.error( "Enter the Password" )
        setFormData( { ...formData, password: e.target.value } )
    }



    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-80 space-y-8'>
                    <div className='text-center mb-8'>
                        <h1 className='text-2xl font-bold mt-2'>
                            Create Account
                        </h1>
                        <p className='text-base-content/60'>
                            Get Started with your free Account
                        </p>
                    </div>
                    <form onSubmit={ handleSubmit } className='text-center'>
                        <div className='form-control'>
                            <fieldset className="fieldset">

                                <Input legend='FullName' onchange={ onChangeFullName } placeholder='Username' value={ formData.fullName } />

                                <Email legend='Email' onchange={ onChangeEmail } placeholder='mail@site.com' value={ formData.email } />

                                <Password legend='Password' onchange={ onChangePassword } placeholder='Password' value={ formData.password } />

                            </fieldset>
                        </div>
                        { isSigningUp ?
                            <button disabled={ isSigningUp } className="btn btn-success btn-wide max-w-xs mt-2">
                                <span className="loading loading-spinner"></span>
                                loading
                            </button> :
                            <button className="btn btn-success btn-wide max-w-xs mt-2" type='submit' disabled={ isSigningUp }>
                                Create Account
                            </button>
                        }
                    </form>
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Already have an account ?{ " " }
                            <Link to='/login' className='link link-primary' >
                                Sign in
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
            <AuthImagePattern title="Join Our Community" subtitle="Connect with Friends, share moments, and stay touched with your loved once" />
        </div>
    )
}
