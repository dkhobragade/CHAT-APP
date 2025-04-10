import { create } from 'zustand'
import { axiosInstance } from '../lib/axios';


export interface AuthState
{
  authUser: any
  isCheckingAuth: boolean
  isSigningUp: boolean
  isUpdatingProfile: boolean
  checkAuth: () => Promise<void>
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
} ) );