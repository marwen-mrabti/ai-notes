/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "img.clerk.com"
			}
		]
	},
	experimental: {
		ppr: true
	}
};

module.exports = nextConfig;
