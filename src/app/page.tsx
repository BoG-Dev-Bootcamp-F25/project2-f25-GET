import Link from 'next/link';

export default function LogIn() {
  return (
    <div>
      <p>
        This is the Log In page
      </p>
      <Link href = "/pages/createAccount">
        <button>hello this is a button</button>
      </Link>
    </div>
  );
}