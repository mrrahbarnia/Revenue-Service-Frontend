"use client"

import { useContext, createContext, useState, useEffect } from "react";

const MessageContext = createContext(null);

export const MessageProvider = ({children}) => {
    const [verifyAccountMessage, setVerifyAccountMessage] = useState(null);
    const [loginMessage, setLoginMessage] = useState(null);
    const [resetPassVerifyMessage, setResetPasswordVerifyMessage] = useState(null);

    const messageVerifyAcc = (message) => {
        setVerifyAccountMessage(message);
    }

    const messageLogin = (message) => {
        setLoginMessage(message);
    }

    const messageResetPasswordVerify = (message) => {
        setResetPasswordVerifyMessage(message);
    }

    return <MessageContext.Provider value={
        {messageVerifyAcc, verifyAccountMessage,
        messageLogin, loginMessage,
        messageResetPasswordVerify, resetPassVerifyMessage}
    }>
        {children}
    </MessageContext.Provider>
};

export const useMessage = () => {
    return useContext(MessageContext);
}
