import { lusitana } from "@/app/ui/fonts";

type THeading = {
  children: React.ReactNode;
};

export function Heading({ children }: THeading) {
  return <h1 className={`${lusitana.className} text-3xl font-bold`}>{children}</h1>;
}