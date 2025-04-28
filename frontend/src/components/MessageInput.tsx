import { useRef, useState } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import { Annoyed, Image, Send, X } from 'lucide-react'
import toast from 'react-hot-toast'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'

const MessageInput = () =>
{
    const [ text, setText ] = useState<string>( "" )
    const [ imagePreview, setImagePreview ] = useState<any>( null )
    const [ isEmojiBoxOpen, setIsEmojiBoxOpen ] = useState<boolean>( false )
    const fileInputRef = useRef<HTMLInputElement>( null )
    const { sendMessages } = useMessageStore()

    const removeImage = () =>
    {
        setImagePreview( null )
        if ( fileInputRef.current ) fileInputRef.current.value = ''

    }

    const handleImageChange = ( e: any ) =>
    {
        setIsEmojiBoxOpen( false )
        const file = e.target.files[ 0 ]
        if ( !file.type.startsWith( 'image/' ) )
        {
            toast.error( "Please select an image type" )
            return
        }
        const reader = new FileReader()
        reader.onloadend = () =>
        {
            setImagePreview( reader.result )
        }
        reader.readAsDataURL( file )
    }

    const handleEmojiClick = ( emojiData: EmojiClickData, ) =>
    {
        setText( ( prev ) => prev + emojiData.emoji )
    }

    const handleSendMessage = async ( e: any ) =>
    {
        e.preventDefault()
        setIsEmojiBoxOpen( false )
        if ( !text.trim() && !imagePreview ) return

        try
        {
            await sendMessages( {
                text: text.trim(),
                image: imagePreview
            } )

            setText( "" )
            setImagePreview( null )
            if ( fileInputRef.current ) fileInputRef.current.value = ''

        }
        catch ( err )
        {
            console.log( "Failed to send message", err )
        }

    }


    return (
        <div className='p-4 w-full'>
            { imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={ imagePreview }
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={ removeImage }
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                                    flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            ) }

            <form onSubmit={ handleSendMessage }>
                <div className='flex-1 flex gap-2'>
                    <input type="text" className='w-full input input-bordered rounded-lg input-sm sm:input-md' placeholder='Type a message...' value={ text } onChange={ ( e ) => setText( e.target.value ) } />
                    <Annoyed size={ 20 } className='w-10 h-10' color="#e70d0d" strokeWidth={ 1 } onClick={ () => setIsEmojiBoxOpen( !isEmojiBoxOpen ) } />
                    <input type="file" accept='image/*' className='hidden' ref={ fileInputRef } onChange={ handleImageChange } />

                    <button
                        type="button"
                        className={ `hidden sm:flex btn btn-circle
                     ${ imagePreview ? "text-emerald-500" : "text-zinc-400" }` }
                        onClick={ () => fileInputRef.current?.click() }
                    >
                        <Image size={ 20 } color="#e70d0d" />
                    </button>
                    <button type='submit' className='btn btn-circle' disabled={ !text.trim() && !imagePreview }>
                        <Send size={ 20 } color="#0de74f" />
                    </button>
                </div>
                <EmojiPicker onEmojiClick={ handleEmojiClick } className='hidden w-full' style={ { width: '100%', height: '20rem' } } autoFocusSearch={ false } searchDisabled={ true } open={ isEmojiBoxOpen } />
            </form>

        </div>
    )
}

export default MessageInput