import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "./ui/button";
import Link from "next/link";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Left Side: Site Name */}
        <div className="text-2xl font-bold text-gray-800">
        <Link href="/" className="-m-1.5 p-1.5">
            {/* <span className="sr-only">Portfolio Builder</span> */}
            <svg className="h-8 w-auto text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </Link>
        </div>

        {/* Right Side: Button */}
        {user ? (
          <div className="flex items-center gap-x-2">
            <Button asChild>
              <LogoutLink className="w-full">Logout</LogoutLink>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <Button variant="secondary" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
            <Button asChild>
              <LoginLink>Log in</LoginLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
