import React from 'react'

const BaseRootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default BaseRootLayout