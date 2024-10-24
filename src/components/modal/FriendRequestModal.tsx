import {ReactNode, useEffect, useState} from "react";


type Props={
    children:ReactNode
}

export default function FriendRequestModal({children}:Readonly<Props>) {
    const [open, setOpen] = useState(false)

    useEffect(() => {

    }, []);

    return (
       <>
           <button onClick={() => setOpen(true)}>{children}</button>
               <div className={`${open ? "block" : "hidden"} bg-white absolute top-6 shadow-lg rounded-lg left-0 min-w-[200px] min-h-[200px]`}>Modal</div>
       </>
    )
}
