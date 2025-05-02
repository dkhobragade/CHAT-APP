import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export interface User
{
    _id: string;
    fullName: string;
    profilePic?: string;
    name?: string
}

export interface MessageState
{
    messages: any[],
    users: User[],
    selectedUser: any,
    isUserLoading: boolean,
    isMessageLoading: boolean,
    getUser: any
    setSelectedUser: any,
    getMessages: any,
    sendMessages: any,
    clearMessages: any,
    subscribeNewMessage: any,
    unSubscribeNewMessage: any,
    addPeople: boolean,
    setAddPeople: ( value: boolean ) => void,
    openSelectedUserInfo: boolean,
    setOpenSelectedUserInfo: ( value: boolean ) => void,
    openAddStatus: boolean,
    setOpenAddStatus: ( value: boolean ) => void

}

export const useMessageStore = create<MessageState>( ( set, get ) => ( {

    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
    addPeople: false,
    openSelectedUserInfo: false,
    setAddPeople: ( value ) => set( { addPeople: value } ),
    setOpenSelectedUserInfo: ( value ) => set( { openSelectedUserInfo: value } ),
    clearMessages: () => set( { messages: [] } ),
    openAddStatus: false,
    setOpenAddStatus: ( value ) => set( { openAddStatus: value } ),

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
            const res = await axiosInstance.get( `/message/${ userId }` )
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

    sendMessages: async ( messageData: any ) =>
    {
        const { selectedUser, messages } = get()
        try
        {
            const res = await axiosInstance.post( `/message/send/${ selectedUser._id }`, messageData )
            set( { messages: [ ...messages, res.data ] } )
        }
        catch ( err )
        {
            console.log( "Error while sending the messages", err )
        }

    },

    clearMessages: async () =>
    {
        const { selectedUser } = get()
        try
        {
            await axiosInstance.post( `message/clear-Messages/${ selectedUser._id }` )
            set( { messages: [] } )
        }
        catch ( err )
        {
            console.log( "Error while clearing the messages", err )
        }

    },

    subscribeNewMessage: () =>
    {
        const { selectedUser } = get()
        if ( !selectedUser ) return

        const socket = useAuthStore.getState().socket

        socket.on( "newMessage", ( newMessage: any ) =>
        {
            if ( newMessage.senderId !== selectedUser._id ) return
            set( {
                messages: [ ...get().messages, newMessage ]
            } )

        } )

    },

    unSubscribeNewMessage: () =>
    {
        const socket = useAuthStore.getState().socket
        socket.off( "newMessage" )
    },

    setSelectedUser: ( selectedUser: any ) => set( { selectedUser } ),

} ) )