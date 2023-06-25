'use client'
import { SessionProvider } from "next-auth/react"

/*
  desc      : Component - Provider
  route     : -
  requires  : SessionProvider = will provide the currentSession and will pass thesession to all children
  exports   : Provider
  author    : Prince Dalsaniya
*/

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      { children }
    </SessionProvider>
  )
}

export default Provider;
