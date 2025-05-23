import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Underdog } from 'next/font/google';
import Link from 'next/link';

const underdog = Underdog({
  variable: '--font-underdog',
  subsets: ['latin'],
  weight: '400',
});

const Header = () => {
  return (
    <header>
      <nav className="border-gray-200 bg-gray-100/10 px-4 py-4 shadow lg:px-6 dark:bg-gray-800">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <Link href="/" className="flex items-center">
            <span
              className={`${underdog.className} self-center text-xl font-semibold whitespace-nowrap text-white`}
            >
              Platón: El Banquete
            </span>
          </Link>
          <div className="flex items-center text-white lg:order-2">
            <SignedOut>
              <SignInButton />
              <span className="mx-2">|</span>
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
