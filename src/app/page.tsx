import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <h1 className="text-4xl font-bold">Welcome to My App</h1>
      <p className="mt-4">This is the landing page of your Next.js app.</p>
      <div className="mt-8">
        <Link href="/signup" className=''>
          <h1 className="w-fit  text-white rounded-md ">Overview</h1>
        </Link>
      </div>
    </main>
  );
}
