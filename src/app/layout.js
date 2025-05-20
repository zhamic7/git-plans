import "@maptiler/sdk/dist/maptiler-sdk.css"; // MapTiler styles
import "./globals.css"; // Your Tailwind CSS

export const metadata = {
  title: "Trip Planner",
  description: "Plan and visualize your route",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
