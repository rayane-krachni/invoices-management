import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GlobalCardProps {
	children: React.ReactNode;
	title: string;
	description: React.ReactNode;
	className?: string;
}

export function GlobalCard({
	children,
	title,
	description,
	className,
}: GlobalCardProps) {
	return (
		<div className={className}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-4xl uppercase fon-bold">{title}</CardTitle>
					<CardDescription className="w-full mx-auto">
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent>{children}</CardContent>
			</Card>
		</div>
	);
}
