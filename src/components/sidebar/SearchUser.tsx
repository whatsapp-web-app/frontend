import {BiArrowBack} from "react-icons/bi";
import {useMemo, useState} from "react";
import {useLazySearchUserQuery} from "../../services/user/user.service.ts";


type Props={
    addChat:() => void
}
export default function SearchUser({addChat}:Readonly<Props>){

    const [search, setSearch] = useState('')

    const [result, setResult]=useState<Array<User>>([])

    const [searchApi]=useLazySearchUserQuery()

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(search.length<2){
            return
        }

        if (event.key === 'Enter') {
            console.log(search)
            event.preventDefault();
            searchApi(search).unwrap().then((res)=>{
                setResult(res)
            }).catch((err:any)=>{})
        }
    };

    return (
        <div className='px-3 py-2'>
            <div className='flex space-x-2 items-center mt-5'>
                <span className='p-2 bg-primary rounded-lg' onClick={addChat}>
                     <BiArrowBack size={25} className=" rounded-lg text-white" color={'white'}/>
                </span>

                <input
                    type="text"
                    placeholder="Search User"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className='mt-5 space-y-2'>
                {result.map((item)=>(
                    <SearchItemCard key={item._id} item={item}/>
                ))}
            </div>
        </div>
    )
}


type SearchItemCardProps={
    item:User
}
function SearchItemCard({item}:Readonly<SearchItemCardProps>){
    return (
        <div className='flex items-center justify-between border p-2 rounded-lg hover:bg-gray-100'>
            <div className='flex items-center space-x-2'>
                <div className='flex w-14 h-14 rounded-full overflow-hidden'>
                    <img className='w-full h-full'
                         src='https://i.pinimg.com/564x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg'/>
                </div>
                <div>
                    <h1 className='text-base font-semibold'>{item.name}</h1>
                    <h1 className='text-sm font-medium text-primary'>@{item.username}</h1>
                </div>
            </div>
            <div>
                <button className='bg-primary text-white p-2 rounded-lg'>Add</button>
            </div>
        </div>
    )
}
