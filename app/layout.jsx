import "../styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider"; 

/*
  desc      : Layout - HomePage
  route     : `{host}/`
  requires  : Provider = Component which will provide the session details for current user
  exports   : Layout which will be rendered on the given route
  author    : Prince Dalsaniya
*/

export const metadata = {
    title: 'PromptWiz',
    description: 'Discover and share AI propts with the best plateform PromptWiz'
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />
                        { children }
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;
