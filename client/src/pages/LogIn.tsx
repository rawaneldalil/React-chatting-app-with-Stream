import { FormEvent, useRef } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function LogIn() {
    const { logIn, user } = useAuth();
    if (logIn.isLoading) {
        return
    }
    if (user != null) {
        return <Navigate to='/'/>
    }

    const usernameRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e:FormEvent) {
        e.preventDefault();
        const username =  usernameRef.current?.value;
        if (username == null  || username === '') {
            return
        }
        logIn.mutate(username);
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-start">
                <label htmlFor="userName">Username</label>
                <Input id="userName" required ref={usernameRef}/>

                <Button disabled={ logIn.isLoading }  className="col-span-full" type="submit">
                    { logIn.isLoading ? 'Loading...' : 'Log in'}
                </Button>
            </form>
        </>
    )
}