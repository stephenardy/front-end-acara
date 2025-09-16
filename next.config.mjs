/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     { source: "/be/:path*", destination: "http://localhost:3000/api/:path*" },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
