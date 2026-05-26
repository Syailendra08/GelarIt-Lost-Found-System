import {
    FileText,
    Search,
    BadgeCheck
} from "lucide-react"
import { motion } from "framer-motion"

export default function HowItWorks() {

    const steps = [
        {
            icon: <FileText size={28} />,
            title: "Lapor",
            description:
                "Lapor barang yang Anda temukan atau hilang. Berikan detail dan unggah foto untuk membantu identifikasi."
        },

        {
            icon: <Search size={28} />,
            title: "Cari",
            description:
                "Cari barang anda yang terorganisir berisi berbagai barang yang ditemukan di seluruh sekolah, yang difilter berdasarkan kategori dan tanggal."
        },

        {
            icon: <BadgeCheck size={28} />,
            title: "Temukan",
            description:
                "Verifikasi kepemilikan dan atur pengambilan yang aman di Ruang Kesiswaan."
        }
    ]

    return (
        <section className="py-24 px-10">
            
            <h1 className="text-4xl font-bold text-center text-blue-900 mb-16">
                How it Works
            </h1>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}

                        initial={{
                            opacity: 0,
                            y: 60,
                            filter: "blur(7px)"
                        }}

                        whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)"
                        }}

                        transition={{
                            duration: 0.6,
                            delay: index * 0.1
                        }}

                        viewport={{ once: true }}

                        className="bg-[#f4f1f7] rounded-3xl p-10 text-center shadow-sm hover:shadow-md transition"
                    >


                        <div className="w-16 h-16 mx-auto rounded-full bg-[#dfe1ff] flex items-center justify-center text-blue-800 mb-6  ">
                            {step.icon}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {step.title}
                        </h2>

                        <p className="text-gray-600 leading-relaxed text-sm">
                            {step.description}
                        </p>

                    </motion.div>
                ))}

            </div>
        </section>
    )
}