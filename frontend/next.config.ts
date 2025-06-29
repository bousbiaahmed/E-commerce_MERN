/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'mtsplus.tn',
      'encrypted-tbn0.gstatic.com',
      'static.nike.com',
      'assets.adidas.com',
      'www.bershka.com',
      'www.championstore.com',
      'www.levi.com',
      'www2.hm.com',
      'media-cdn.citadium.com',
      'resize.elle.fr' // ✅ nouveau domaine ajouté
    ],
  },
};

module.exports = nextConfig;
