/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'santai-six.vercel.app',
              port: '',
              pathname: '/**/*',
            },
            {
                protocol: 'https',
                hostname: 'santai.gg',
                port: '',
                pathname: '/**/*',
              },
          ],
    }
};

export default nextConfig;
