import SideBar from "../components/sidebar";
import ChatProvider from "../context/chat.context.tsx";
import SelectedChat from "../components/chat/SelectedChat.tsx";
import {useBreakpoint} from "../hooks/useBreakpoints.tsx";

function Main() {
    const { isAboveSm, isBelowSm, sm } = useBreakpoint("sm");

    console.log(isAboveSm, isBelowSm, sm)
  return (
      <ChatProvider>
        <div className="h-screen w-screen overflow-hidden flex divide-x" style={{
            backgroundImage: "url('https://i.pinimg.com/564x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-1/4">
            <SideBar />
          </div>
          <div className="flex-1">
              <SelectedChat/>
          </div>
        </div>
      </ChatProvider>
  );
}

export default Main;
