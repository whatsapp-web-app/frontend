import {useChatContext} from "../../hooks/useChatProvider.tsx";
import useAppSelector from "../../hooks/useAppSelector.tsx";
import {useMemo} from "react";

export default function SelectedChatHeader(){
    const {selectedChat,typing}=useChatContext();

    const {user}=useAppSelector(state => state.authSlice)


    const values=useMemo(()=>({
         name:selectedChat?.isGroup?selectedChat?.name:selectedChat?.participants.filter((c)=>c._id!==user?._id)[0].name,
            profilePic:selectedChat?.isGroup?selectedChat?.avatar:selectedChat?.participants.filter((c)=>c._id!==user?._id)[0].profilePic
    }),[selectedChat])

    return(
        <div className='h-16 bg-white w-full px-6 flex items-center justify-between'>
            <div className='flex items-center'>
                <div className='flex w-14 h-14 rounded-full overflow-hidden'>
                    <img src={values.profilePic} />
                </div>
                <div className='space-y-0'>
                  <p className='font-bold'>{values.name}</p>
                    <p className='text-xs text-gray-500'>{
                        typing
                            ? 'Typing...'
                            : 'Online'
                    }</p>
                </div>
            </div>

        </div>
    )
}
