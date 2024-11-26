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
        <div className="text-2xl font-bold text-gray-800">MySite</div>

        {/* Right Side: Button */}
        {user ? (
          <div className="flex items-center gap-x-2">
            <Button variant="secondary" asChild>
              <Link href={"/update/"}>
              Profile</Link>
            </Button>
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
