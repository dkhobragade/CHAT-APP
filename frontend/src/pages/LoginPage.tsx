import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import AuthImagePattern from '../components/AuthImagePattern'
import { Link } from 'react-router-dom'
import Email from '../lowLevelComponents/EmailInput'
import Password from '../lowLevelComponents/PasswordInput'
import toast from 'react-hot-toast'

export const LoginPage = () =>
{

    const [ formData, setFormData ] = useState( {
        fullName: '',
        email: '',
        password: ''
    } )


    const { login, isLogginUp } = useAuthStore()

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

    const handleSubmit = ( e: { preventDefault: () => void } ) =>
    {
        e.preventDefault()
        login( formData )
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


                                <Email legend='Email' onchange={ onChangeEmail } placeholder='mail@site.com' value={ formData.email } />

                                <Password legend='Password' onchange={ onChangePassword } placeholder='Password' value={ formData.password } />

                            </fieldset>
                        </div>
                        { isLogginUp ?
                            <button disabled={ isLogginUp } className="btn btn-success btn-wide max-w-xs mt-2">
                                <span className="loading loading-spinner"></span>
                                loading
                            </button> :
                            <button className="btn btn-success btn-wide max-w-xs mt-2" type='submit' disabled={ isLogginUp }>
                                Sign In
                            </button>
                        }
                    </form>
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Don't have an account ?{ " " }
                            <Link to='/signup' className='link link-primary' >
                                Create Account
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
            <AuthImagePattern title="Join Our Community" subtitle="Connect with Friends, share moments, and stay touched with your loved once" />
        </div>
    )
}
