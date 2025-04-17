import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export interface User
{
    _id: string;
    fullName: string;
    profilePic?: string;
    name?: string
}

export interface MessageState
{
    messages: [],
    users: User[],
    selectedUser: any,
    isUserLoading: boolean,
    isMessageLoading: boolean,
    getUser: any
    setSelectedUser: any,
    getMessages: any
}

export const useMessageStore = create<MessageState>( ( set ) => ( {

    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUser: async () =>
    {
        set( { isUserLoading: true } )
        try
        {
            const res = await axiosInstance.get( '/message/users' )
            set( { users: res.data } )
        }
        catch ( err )
        {
            console.log( "Error while getting user from message", err )
        }
        finally
        {
            set( { isUserLoading: false } )
        }
    },

    getMessages: async ( userId: any ) =>
    {
        set( { isMessageLoading: true } )
        try
        {
            const res = await axiosInstance( `/message/${ userId }` )
            set( { messages: res.data } )
        }
        catch ( err )
        {
            console.log( "Error while getting the message from user", err )
        }
        finally
        {
            set( { isMessageLoading: false } )
        }
    },

    setSelectedUser: ( selectedUser: any ) => set( { selectedUser } )

} ) )