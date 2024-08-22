type Props = {
	children: React.ReactNode;
};
function AuthLayout({ children }: Props) {
	return <body>{children}</body>;
}

export default AuthLayout;
