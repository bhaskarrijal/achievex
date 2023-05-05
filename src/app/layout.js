import { AuthContextProvider } from '@/context/AuthContext'
import './globals.css'
import '../../assets/bootstrap-icons/font/bootstrap-icons.css'
import Header from './components/header'

export const metadata = {
    title: 'AchieveX',
    description: 'Created by Bhaskar Rijal',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='max-w-3xl w-[90%] mx-auto'>
                <AuthContextProvider>
                    <Header />
                    {children}
                </AuthContextProvider>
            </body>
        </html>
    )
}
