import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import {  useState } from 'react'
import { Disclosure } from '@headlessui/react'
import SignIn from '@/components/SignIn'
import {
  AuthType,
  ClaimType,
  SismoConnectButton,
  SismoConnectConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";

/* ***********************  Sismo Connect Config *************************** */
const sismoConnectConfig = {
  appId: "0xf4977993e52606cfd67b7a1cde717069",
  vault: {
    // For development purposes insert the identifier that you want to impersonate here
    // Never use this in production
    impersonate: [
      "dhadrien.sismo.eth",
      "github:dhadrien",
      "twitter:dhadrien_",
    ],
  },
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [error, setError] = useState();

 async function onSismoConnectResponse(response) {
  setLoading(true);
  try {
    const res = await fetch("/api/sismo", {
      method: "POST",
      body: JSON.stringify(response),
    });
    console.log('res 42 - ', res)
    if (!res.ok) {
      const error = await res.json();
      setError(error);
      return;
    }
    const user = await res.json();
    console.log('48: ', user)
    setUser(user);
  } catch (err) {
    console.log('51 - ')
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

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
            <SismoConnectButton
              // the client config created
              config={sismoConnectConfig}
              // the auth request we want to make
              // here we want the proof of a Sismo Vault ownership from our users
              auths={[
                { authType: AuthType.VAULT },
                { authType: AuthType.EVM_ACCOUNT },
              ]}
              claims={[
                // we ask the user to prove that he has a gitcoin passport with a score above 15
                // https://factory.sismo.io/groups-explorer?search=0x1cde61966decb8600dfd0749bd371f12
                {
                  groupId: "0x1cde61966decb8600dfd0749bd371f12",
                  claimType: ClaimType.GTE,
                  value: 15,
                },
                // we ask the user to prove that he is part of the Sismo Contributors group and selectively prove its level
                // https://factory.sismo.io/groups-explorer?search=0xe9ed316946d3d98dfcd829a53ec9822e
                {
                  groupId: "0xe9ed316946d3d98dfcd829a53ec9822e",
                  isSelectableByUser: true,
                },
                // we optionally ask the user to prove that he is following Sismo on Lens
                // https://factory.sismo.io/groups-explorer?search=0xabf3ea8c23ff96893ac5caf4d2fa7c1f
                {
                  groupId: "0xabf3ea8c23ff96893ac5caf4d2fa7c1f",
                  isOptional: true,
                },
              ]}
              // we ask the user to sign a message
              signature={{ message: "hello", isSelectableByUser: true }}
              // onResponseBytes calls a 'setResponse' function with the responseBytes returned by the Sismo Vault
              onResponse={(response) => {
                onSismoConnectResponse(response);
              }}
              verifying={loading}
            />
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
