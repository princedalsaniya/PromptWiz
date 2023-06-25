"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'

/*
  component : Navigation
  desc : Navigation-bar
  route : None
  dependency : Need the loginState of the user to show `createPrompt` and `logout` buttons.
*/

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/images/logo.svg" 
          alt="PromptWiz Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptWiz</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">Create Prompt</Link>
            <button type="button" onClick={signOut} className="outline_btn">Logout</button>
            <Link href="/profile">
              <Image 
                src="/images/logo.svg"
                width={40}
                height={40}
                className="rounded-full"
                alt="Profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >Login</button>
              })
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
            {isUserLoggedIn ? (
              <div className="flex">
                 <Image 
                  src="/images/logo.svg"
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="Profile"
                  onClick={() => setToggleDropDown((prev) => !prev)}
                ></Image>
                {toggleDropDown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropDown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button 
                      type="button"
                      onClick={() => {
                        setToggleDropDown(false);
                        signOut();
                      }}
                      className="mt-5 w-full black_btn"
                    >Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {providers && 
                  Object.values(providers).map((provider) => {
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn"
                    >Login</button>
                  })
                }
              </>
            )}
      </div>
    </nav>
  )
}

export default Nav