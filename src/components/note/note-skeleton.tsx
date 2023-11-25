import { PenLine, Trash } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function NotesFallbackSkeleton() {
	return (
		<ul className="mx-auto grid w-full grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{Array.from({ length: 3 }).map((_, i) => (
				<li key={i} className=" ">
					<NoteSkeleton />
				</li>
			))}
		</ul>
	);
}

function NoteSkeleton() {
	return (
		<Card className="col-span-1 mx-auto flex  w-full flex-col justify-between md:min-h-[45dvh] md:w-3/4 ">
			<>
				<CardHeader>
					<CardTitle>
						<Skeleton className="h-6 w-32" />
					</CardTitle>
					<CardDescription> {format(new Date(), "MM/dd/yyyy")}</CardDescription>
				</CardHeader>

				<CardContent className="space-y-2">
					<Skeleton className="h-4 w-64" />
					<Skeleton className="h-4 w-64" />
					<Skeleton className="h-4 w-64" />
				</CardContent>
			</>

			<CardFooter className="flex w-full items-center justify-between gap-5">
				<Skeleton className="flex items-center gap-2 bg-slate-900 px-4 py-2  text-slate-100 dark:bg-slate-200 dark:text-slate-900">
					<PenLine className="h-6 w-6" />
					Edit
				</Skeleton>
				<Skeleton className="flex items-center gap-2 bg-red-600 px-2 py-2 text-slate-50">
					<Trash className="h-6 w-6" />
					Delete
				</Skeleton>
			</CardFooter>
		</Card>
	);
}
