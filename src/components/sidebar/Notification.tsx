import {BiArrowBack} from "react-icons/bi";


type Props = {
    notificationChat: () => void
}

export default function Notification({notificationChat}:Readonly<Props>) {
    return (
        <div className='w-full h-full px-2'>
            <div className='mt-5 flex space-x-2 items-center'>
                 <span className='p-0.5 bg-primary rounded-lg' onClick={notificationChat}>
                     <BiArrowBack size={20} className=" rounded-lg text-white" color={'white'}/>
                </span>
                <div className='flex-1 flex justify-between items-center'>
                    <h1 className='text-base font-bold'>Notification</h1>
                    <h1 className='text-sm font-semibold text-primary cursor-pointer'>See all</h1>
                </div>

            </div>

        </div>
    )
}
