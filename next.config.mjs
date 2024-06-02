/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXT_PUBLIC_BASE_URL:"http://localhost:3000",
        DB_URI: "mongodb+srv://muhammadaliawan8055:8pN5JSaErYncCadZ@cluster0.nlduxpk.mongodb.net/?retryWrites=true&w=majority"
    },
    images:{
        domains:["res.cloudinary.com"]
    }
};

export default nextConfig;
