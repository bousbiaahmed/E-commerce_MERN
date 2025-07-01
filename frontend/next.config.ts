/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mtsplus.tn',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'static.nike.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.adidas.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bershka.com',
      },
      {
        protocol: 'https',
        hostname: 'www.championstore.com',
      },
      {
        protocol: 'https',
        hostname: 'www.levi.com',
      },
      {
        protocol: 'https',
        hostname: 'www2.hm.com',
      },
      {
        protocol: 'https',
        hostname: 'media-cdn.citadium.com',
      },
      {
        protocol: 'https',
        hostname: 'resize.elle.fr',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // ✅ celui-ci est ESSENTIEL
      },
    ],
  },
};

module.exports = nextConfig;
