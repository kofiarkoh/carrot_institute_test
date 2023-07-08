/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	/* async redirects() {
		return [
			{
				source: "/",
				destination: "/auth/login",
				permanent: true,
			},
		];
	}, */
	typescript: {
		ignoreBuildErrors: true,
	},
	basePath: "/~mediabil/carrot_institute_test",
};

module.exports = nextConfig;
