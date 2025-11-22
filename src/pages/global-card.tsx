import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "../assets/logo.jpeg"
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
				<div className="flex flex-col justify-cener items-center text-center">
					
					<CardTitle className="flex justify-cener items-center text-3xl uppercase fon-bold">
						<img width={100}  src={logo}></img>
						{title}</CardTitle>
					<CardDescription className="w-full mx-auto">
						{description}
					</CardDescription>
				</div>
				<CardContent>{children}</CardContent>
			</Card>
		</div>
	);
}
