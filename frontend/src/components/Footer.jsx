export default function Footer() {
    return (
        <footer className="w-full  bg-[#fdfdff]">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-blue-800">
                        GelarIt
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                        @ 2026 A trusted lost and found platform for SMK Wikrama Vocational High School .
                    </p>
                </div>


                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                    <a
                        href="https://www.instagram.com/smkwikrama/"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="hover:text-blue-600 transition"
                    >
                        School Instagram
                    </a>

                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="hover:text-blue-600 transition"
                    >
                        Terms of Service
                    </a>

                    <a
                        href="https://www.youtube.com/channel/UCyhEUzlXbXet57qFnDfdWuw"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="hover:text-blue-600 transition"
                    >
                        School Youtube
                    </a>

                    <a
                        href="https://smkwikrama.sch.id"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="hover:text-blue-600 transition"
                    >
                        School Website
                    </a>

                </div>
            </div>
        </footer>
    );
}