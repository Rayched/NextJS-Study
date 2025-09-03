import { Metadata } from "next";
import { title } from "process";

export const metadata: Metadata = {
  title: {
    default: "Details",
    template: "Details | %s"
  },
};
export default function DetailsLayout({children}: {children: React.ReactNode}){
  return (
    <div>
        {children}
    </div>
  )
};