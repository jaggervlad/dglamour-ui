import SignIn from '@/components/auth/SignIn';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
    if(document.cookie && document.cookie.includes("accessToken")) {
      window.location.href = "/profile"
    }
    `,
          }}
        />
      </Head>
      <SignIn />
    </>
  );
}
