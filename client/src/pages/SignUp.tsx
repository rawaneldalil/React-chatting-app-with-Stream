import { FormEvent, useRef } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";

export function SignUp() {
    const { signUp } = useAuth();
    if (signUp.isLoading) {
        return
    }

    const usernameRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e:FormEvent) {
        e.preventDefault();
        const username =  usernameRef.current?.value;
        const name =  nameRef.current?.value;
        const image = imageRef.current?.value;
        if (username == null  || username === '' || name == null || name === '') {
            return
        }
        signUp.mutate({ id: username, name, image: image })
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-start">
                <label htmlFor="userName">Username</label>
                <Input id="userName" pattern="\S*" required ref={usernameRef}/>

                <label htmlFor="name">Name</label>
                <Input id="name" required ref={nameRef}/>

                <label htmlFor="imageURL">Image URL</label>
                <Input id="imageURL" type="url"  ref={imageRef}/>
                <Button disabled={ signUp.isLoading }  className="col-span-full" type="submit">
                    { signUp.isLoading ? 'Loading...' : 'Create Account'}
                </Button>
            </form>
        </>
    )
}