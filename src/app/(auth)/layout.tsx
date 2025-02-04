export default function AuthLayout({ 
    children }: Readonly <{ children: React.ReactNode }>) {
    return (
        <main>
            <div className="flex h-screen w-screen items-center justify-center">
                {children}
            </div>
        </main>
        
    )
}