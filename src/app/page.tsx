import Link from 'next/link';
import TopBar from './components/TopBar';

export default function LogIn() {
  return (
    <div>
      <TopBar />

      <div>
        <p>Login</p>
        <p>Don't have a login? Sign up</p>
      </div>

      <Link href = "/pages/createAccount">
        <button>hello this is a button</button>
      </Link>
    </div>
  );
}