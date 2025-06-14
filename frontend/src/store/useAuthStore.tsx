import { create } from 'zustand'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useMessageStore } from './useMessageStore';
import { io } from 'socket.io-client';


const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:5001' : '/'

export interface AuthState
{
  socket: any;
  authUser: any
  isCheckingAuth: boolean
  isSigningUp: boolean
  isUpdatingProfile: boolean
  isLogginUp: boolean
  checkAuth: () => Promise<void>
  signup: any,
  logout: any,
  login: any,
  onlineUsers: any[],
  updateProfile: any,
  updateFullName: any,
  aboutInfomation: any,
  aboutInfo: string,
  connectSocket: () => void;
  disConnectSocket: () => void;
  deleteAccount: any
}

export const useAuthStore = create<AuthState>( ( set, get ) => ( {
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  onlineUsers: [],
  isUpdatingProfile: false,
  isLogginUp: false,
  socket: null,
  aboutInfo: '',

  checkAuth: async () =>
  {
    set( { isCheckingAuth: true } );

    try
    {

      const res = await axiosInstance.get( '/auth/check' );
      set( { authUser: res.data } )
      get().connectSocket()

    } catch ( err )
    {
      console.log( 'Error in checkAuth:', err )
      set( { authUser: null } )

    } finally
    {
      set( { isCheckingAuth: false } );
    }
  },

  login: async ( data: any ) =>
  {

    set( { isLogginUp: true } )
    try
    {
      const res = await axiosInstance.post( 'auth/login', data )
      set( { authUser: res.data } )
      toast.success( "Logged In Successfully" )
      get().connectSocket()
    }
    catch ( err )
    {
      toast.error( "Invalid Credentials" )
      console.log( "Error while Logining", err )
    }
    finally
    {
      set( { isLogginUp: false } );
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
      get().connectSocket()
    }
    catch ( error )
    {
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
      useMessageStore.getState().setSelectedUser( null )
      useMessageStore.getState().setAddPeople( false )
      useMessageStore.getState().setOpenSelectedUserInfo( false )
      toast.success( "Logout Successfully" )
      get().disConnectSocket()
    }
    catch ( err )
    {
      console.log( "Error while Logout", err )
    }
  },

  updateProfile: async ( data: any ) =>
  {
    set( { isUpdatingProfile: true } )

    try
    {
      const res = await axiosInstance.put( '/auth/update-profile', data )
      set( { authUser: res.data } )
      toast.success( "Profile Updated Successfully" )
    } catch ( err )
    {
      console.log( "Error while Uploading Profile", err )
      toast.error( "Error while Uploading Profile" )
    }
    finally
    {
      set( { isUpdatingProfile: false } )
    }
  },

  updateFullName: async ( data: any ) =>
  {
    try
    {
      const res = await axiosInstance.put( '/auth/update-fullName', data )
      set( { authUser: res.data } )
      toast.success( "FullName Updated Successfully" )
    }
    catch ( err )
    {
      console.log( "Error while Updating FullName", err )
      toast.error( "Error while Updating FullName" )
    }

  },

  aboutInfomation: async ( data: any ) =>
  {
    try
    {
      const res = await axiosInstance.put( '/auth/about', data )
      set( { authUser: res.data } )
      toast.success( "Added About Info Successfully" )
    }
    catch ( err )
    {
      console.log( "Error while adding About Info", err )
      toast.error( "Error while adding About Info" )
    }

  },

  deleteAccount: async ( data: any ) =>
  {
    try
    {
      await axiosInstance.put( '/auth/delete', data )
      toast.success( "Account deleted Successfully" )
    }
    catch ( err )
    {
      console.log( "Error while deleting account", err )
      toast.error( "Error while deleting account" )
    }
  },


  connectSocket: () =>
  {

    const { authUser } = get()

    if ( !authUser || get().socket?.connected ) return


    const socket = io( BASE_URL, {
      query: {
        userId: authUser._id
      }
    } )

    socket.connect()

    set( { socket: socket } )

    socket.on( "getOnlineUsers", ( userIds ) =>
    {
      set( { onlineUsers: userIds } )
    } )
  },
  disConnectSocket: () =>
  {
    if ( get().socket?.connected ) get().socket.disconnect()
  }
} ) );
