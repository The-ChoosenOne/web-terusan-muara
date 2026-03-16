/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uppbxjjuptxwupcbtlxo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // TAMBAHIN BAGIAN INI JAK:
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Naikin limit jadi 10MB
    },
  },
};

export default nextConfig;