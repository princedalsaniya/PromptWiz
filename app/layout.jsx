import "../styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider"; 

/*
  component : None.
  desc : Layout for HomePage
  route : `{host}/`
  dependency : Need the loginState of the user to show `createPrompt` and `logout` buttons.
*/

export const metadata = {
    title: 'PromptWiz',
    description: 'Discover and share AI propts with the best plateform PromptWiz'
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app">
                    <Nav />
                    { children }
                </main>
            </body>
        </html>
    )
}

export default RootLayout;
