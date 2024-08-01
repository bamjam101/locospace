/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'api.mapbox.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig
