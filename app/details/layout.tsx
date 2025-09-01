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
        <h4>{"'/details' 및 하위 URL에 공통적으로 적용되는 Layout"}</h4>
    </div>
  )
};