import { AuthContextProvider } from '@/context/AuthContext'
import './globals.css'
import '../../assets/bootstrap-icons/font/bootstrap-icons.css'
import Header from './components/header'
import { DataContextProvider } from '@/context/DataContext'

export const metadata = {
    title: 'AchieveX',
    description: 'Created by Bhaskar Rijal',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='max-w-3xl w-[90%] mx-auto'>
                <AuthContextProvider>
                    <DataContextProvider>
                        <Header />
                        {children}
                    </DataContextProvider>
                </AuthContextProvider>
            </body>
        </html>
    )
}
