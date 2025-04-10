import { create } from 'zustand'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';


export interface AuthState
{
  authUser: any
  isCheckingAuth: boolean
  isSigningUp: boolean
  isUpdatingProfile: boolean
  checkAuth: () => Promise<void>
  signup: any
}

export const useAuthStore = create<AuthState>( ( set ) => ( {
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isUpdatingProfile: false,

  checkAuth: async () =>
  {
    set( { isCheckingAuth: true } );

    try
    {

      const res = await axiosInstance.get( '/auth/check' );
      set( { authUser: res.data } )

    } catch ( err )
    {
      console.log( 'Error in checkAuth:', err )
      set( { authUser: null } )

    } finally
    {
      set( { isCheckingAuth: false } );
    }
  },

  signup: async ( data: any ) =>
  {
    set( { isSigningUp: true } )

    try
    {
      const res = await axiosInstance.post( '/auth/signup', data )
      set( { authUser: res.data } )
      toast.success( "Account Created Successfully" )
    }
    catch ( error )
    {
      // toast.error( error.response.data.message )
      console.log( "Error while singup", error )

    }
    finally
    {
      set( { isSigningUp: false } )
    }
  },

  logout: async () =>
  {
    try
    {
      await axiosInstance.post( "/auth/logout" )
      set( { authUser: null } )
      toast.success( "Logout Successfully" )
    }
    catch ( err )
    {
      console.log( "Error while Logout", err )
    }
  }
} ) );