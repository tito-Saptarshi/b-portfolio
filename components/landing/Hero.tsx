import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export async function Hero() {
    
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Build Your Dream Portfolio
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Showcase your skills and projects with our easy-to-use portfolio
            builder. Stand out from the crowd and land your dream job.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <LoginLink>Log in</LoginLink>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
