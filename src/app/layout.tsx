import '../styles/globals.scss';

export const metadata = {
  title: 'Math Test',
  description: 'A simple math test application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
