import { IoIosPersonAdd } from "react-icons/io";
import {BiBell} from "react-icons/bi";

type Props = {
    addChat: () => void
    notificationChat: () => void
};

function Header({addChat,notificationChat}:Readonly<Props>) {
  return (
    <div className=" mb-4 py-2">
      <div className="flex justify-between items-center px-4">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="flex items-center gap-3">
          <IoIosPersonAdd className="w-6 h-6 cursor-pointer" onClick={addChat} />
          <span className='relative' onClick={notificationChat}>
              <BiBell className="w-6 h-6 cursor-pointer"  />
            <span className='absolute -top-1 right-0 w-4 h-4 rounded-full bg-red-500 flex justify-center items-center text-xs text-white font-bold'>2</span>
          </span>
        </div>

      </div>

    </div>
  );
}

export default Header;
