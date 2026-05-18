import {
    ShieldCheck,
} from "lucide-react"

export default function TrustedSection() {

    const features = [
        "Verifikasi Kartu Pelajar / Nametag",
        "Manajemen barang yang aman",
        "Pemberitahuan secara real time"
    ]

    return (
        <section className="max-w-7xl mx-auto px-10 py-28">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">


                <div>

                    <h1 className="text-5xl font-bold text-blue-900 mb-6">
                        Aman & Terpercaya
                    </h1>

                    <p className="text-gray-600 leading-relaxed mb-8">
                        Dirancang untuk sekolah, platform kami memastikan
                        privasi siswa dan keamanan barang. Admin mengawasi
                        setiap klaim untuk memastikan barang sampai ke
                        pemiliknya yang sah.
                    </p>


                    <div className="space-y-4">

                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >

                                <div className=" w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center text-white">
                                    <ShieldCheck size={14} />
                                </div>

                                <p className="text-gray-700">
                                    {feature}
                                </p>

                            </div>
                        ))}

                    </div>
                </div>

                <div className="flex justify-center">

                    <div className=" border-[6px] border-blue-900 rounded-3xl overflow-hidden shadow-xl rotate-1 hover:rotate-0 transition-all
      duration-300">

                        <img
                            src="https://smkwikrama.sch.id/storage/1684135144-page.jpg"
                            alt="SMK Wikrama"
                            className="w-full max-w-130 h-105 object-cover"/>

                    </div>
                </div>
            </div>
        </section>
    )
}