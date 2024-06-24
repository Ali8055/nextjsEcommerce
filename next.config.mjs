/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
    DB_URI:
      // "mongodb+srv://muhammadaliawan8055:8pN5JSaErYncCadZ@cluster0.nlduxpk.mongodb.net/?retryWrites=true&w=majority",
      "mongodb+srv://nest-practice:12345@cluster0.hfzxawv.mongodb.net/",
    NEXTAUTH_SECRET: "12345",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
