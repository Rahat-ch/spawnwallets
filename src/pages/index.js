import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import {  useState } from 'react'
import { Disclosure } from '@headlessui/react'
import SignIn from '@/components/SignIn'

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
