interface FooterProps{
    className?: string;
}

export default function Footer({ className } : FooterProps){
    return (
        <footer className={`h-16 flex items-center px-4 bg-gray-100 border-b ${className || ""}`}>
            <p>© Manavi Sharma</p>
        </footer>
    )
}