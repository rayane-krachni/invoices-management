import { Toaster } from "sonner";

interface MainLayoutProps {
	children: React.ReactNode;
	footer?: React.ReactNode;
}

export function MainLayout({ children, footer }: MainLayoutProps) {
	return (
		<div className="flex min-h-svh flex-col items-start justify-start gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-full flex-col gap-6">
				<Toaster position="top-right" /> 
			
				{children}
				{footer}
			</div>
		</div>
	);
}
