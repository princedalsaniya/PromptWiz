import "../styles/globals.css";

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
                    { children }
                </main>
            </body>
        </html>
    )
}

export default RootLayout;
