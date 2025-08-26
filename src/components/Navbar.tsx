interface NavbarProps{
    className?: string;
}
export default function Navbar({ className } : NavbarProps){
    return (
        <nav className="h-16 flex items-center px-4 bg-gray-100 border-b justify-between px-10"> 
            <h1 className="items-center">My Website</h1>
            <ul>
                <li>Home</li>
            </ul>
        </nav>
    )
}