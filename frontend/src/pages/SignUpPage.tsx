import React, { use, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'

export const SignUpPage = () =>
{

    const [ showPassword, setShowPassword ] = useState( false )
    const [ formData, setFormData ] = useState( {
        fullName: '',
        email: '',
        password: ''
    } )

    const handleSubmit = () =>
    {

    }

    const { isSigningUp } = useAuthStore()

    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    <div className='text-center mb-8'>
                        <h1 className='text-2xl font-bold mt-2'>
                            Create Account
                        </h1>
                        <p className='text-base-content/60'>
                            Get Started with your free Account
                        </p>
                    </div>
                    <form action={ handleSubmit }>
                        <div className='form-control'>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">FullName</legend>
                                <label className="input validator">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                                    <input type="text" value={ formData.fullName } onChange={ e => setFormData( { ...formData, fullName: e.target.value } ) } required placeholder="Username" />
                                </label>
                                <legend className="fieldset-legend">Email</legend>
                                <label className="input validator">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                                    <input type="email" placeholder="mail@site.com" value={ formData.email }
                                        onChange={ e => setFormData( { ...formData, email: e.target.value } ) } required />
                                </label>
                                <legend className="fieldset-legend">Password</legend>
                                <label className="input validator">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                                    <input type="password" required placeholder="Password" onChange={ e => setFormData( { ...formData, password: e.target.value } ) } />
                                </label>
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
