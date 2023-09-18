import { Chat, LoadingIndicator, Channel, ChannelList, Window, ChannelHeader, MessageList, MessageInput, ChannelListMessengerProps, useChatContext } from "stream-chat-react";
import { useLoggedInAuth } from "../context/AuthContext";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";


export function Home() {

    const { user, streamChat } = useLoggedInAuth();
    if (streamChat == null) return <LoadingIndicator /> 

    return (
        <Chat client={streamChat}>
            <ChannelList 
            List={Channels} 
            sendChannelsToList 
            filters={{ members: { $in: [user.id] } }} />
            <Channel>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
            </Channel>
        </Chat>
    ) 
}    

function Channels({ loadedChannels }:ChannelListMessengerProps) {
    const navigate = useNavigate();
    const { logout } = useLoggedInAuth();
    const { setActiveChannel, channel: activeChannel } = useChatContext();
    return (
        <div className="w-60 flex flex-col gap-4 m-3 h-full">
            <Button onClick={() => navigate('/channel/new')}>New Conversation</Button>

            <br className="border-gray-500"/>

            { loadedChannels != null && loadedChannels.length > 0 
            ? loadedChannels.map(channel => { 
                const isActive = channel === activeChannel;
                const extraClasses = isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 bg-gray-100'
                return <button 
                disabled={isActive} 
                className={`p-4 rounded-lg flex gap-3 items-center ${extraClasses}`}
                key={channel.id}
                onClick={() => setActiveChannel(channel)}>
                    {channel.data?.image && (
                        <img
                            src={channel.data.image}
                            className="w-10 h-10 rounded-full object-center object-cover"
                        />
                    )}
                    <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {channel.data?.name || channel.id}
                    </div>
                </button>
             }) 
            : 'No Conversations'}
            <br className="border-gray-500 mt-auto"/>
            <Button onClick={() => logout.mutate('')}>Logout</Button>
        </div>
    )
}
    