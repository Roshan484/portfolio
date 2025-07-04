import React from 'react'

const DashboardRootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default DashboardRootLayout