export default function PageHeader({ children, title, description }) {
    return (
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#0F172A]">{title}</h1>

            <p className="mt-2 text-sm text-gray-500">
                {description}
            </p>
            <div>
                {children}
            </div>
        </div>

    )
}