import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { XCircleIcon } from '@heroicons/react/20/solid'
import {  useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { useRouter } from 'next/router'



function SignIn({onCancle}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidCred,setIsInvalidCred] = useState(false)
  const router = useRouter()
  const handleSignIn = (e) => {
    e.preventDefault();

    const validUsername = ["admin","polygon","ethglobal","xmtp","worldcoin","quicknode"];
    const validPassword = "password";

    if (validUsername.includes(username) && password === validPassword) {
      // Open Dashboard
      router.push('/dashboard')
      console.log("Sign in successful");
    } else {
      // Show error popup
      setIsInvalidCred(true)
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
  )
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl text-center font-bold leading-tight tracking-tight text-white-900">SponWallet- Sponsored transactions</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white justify-center font-bold py-2 px-4 rounded-full mx-auto text-xl" onClick={() => setShowModal(true)}>
              Sign In
            </button>
            {showModal && (
              <div className="bg-white border-2 border-blue-500 fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-2">
                  <SignIn onCancle={() => setShowModal(false)}/>
                </div>
              </div>
            )}
            
           </div>
          </main>
        </div>
      </div>

    </>
  )
}
