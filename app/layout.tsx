import { Metadata } from "next";
import Navigation from "../components/navigation"

export const metadata = {
  title: "NextJS Study",
  description: 'NextJS 프레임워크 학습용 예제입니다.',
};

function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
};

export default RootLayout;