"use client";
 
import {
    createContext,
    useContext,
    useEffect, useState
} from "react";
import {io as ClientIO} from "socket.io-client";

 
const SocketContext = createContext({
    socket: null,
    isConnected: false,
})
 
export const useSocket = () => { return useContext(SocketContext) };
 
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
 
    useEffect(() => {
        if (!socket) {
            return;
        }
 
        socket.on("disconnect", async () => {
            setIsConnected(false);
        });
    }, []);
 
    useEffect(() => {
        const socketInstance = new (ClientIO)(process.env.NEXT_PUBLIC_SITE_URL, {
            path: "/api/socket/io",
            addTrailingSlash: false
        })
 
        socketInstance.on("connect", async () => {
            setIsConnected(true);
        })
 
        setSocket(socketInstance);
 
        return () => {
            socketInstance.disconnect();
        }
    }, [])
 
    return (
        <SocketContext.Provider value={{socket, isConnected}}>
            {children}
        </SocketContext.Provider>
    )
}