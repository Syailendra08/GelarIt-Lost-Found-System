export default function ButtonComp({children, type = "button", onClick, className = ""}) {
    return (
        <button 
      type={type}
      onClick={onClick}
      className={` text-[#001a72] bg-[#ffcc29] hover:bg-[#f7c324] active:scale-[0.98] focus:ring-4 focus:ring-yellow-100 font-bold rounded-xl text-md px-2 py-2 text-center transition-all shadow-md shadow-yellow-400/20 ${className}`}
    >
      {children}
    </button>
    );
}