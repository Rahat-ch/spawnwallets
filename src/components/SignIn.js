// components/SignIn.js

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

function SignIn({ onCancle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidCred, setIsInvalidCred] = useState(false);
  const { login } = useContext(AuthContext);
  const router = useRouter()

  const handleSignIn = (e) => {
    e.preventDefault();

    const validUsername = [
      "admin",
      "polygon",
      "ethglobal",
      "xmtp",
      "worldcoin",
      "quicknode",
      "filecoin",
    ];
    const validPassword = "password";

    if (validUsername.includes(username) && password === validPassword) {
      // Login and close modal
      login(username, password);
      router.push('/dashboard')
      
    } else {
      // Show error popup
      setIsInvalidCred(true);
      console.log("Invalid username or password");
    }
  };

  return (
    <>
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Spon Wallet"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSignIn}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <br/>
              <button
                type="submit"
                onClick={onCancle}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Cancle
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-white-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>


        {isInvalidCred && 
          <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Invalid Username and password</h3>
        </div>
          </div>
        </div>
        }
        
        </div>
      </div>
    </>
  );
}

export default SignIn;
