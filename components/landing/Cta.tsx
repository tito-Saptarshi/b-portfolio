import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'

export function CTA() {
  return (
    <div className="bg-background">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to showcase your work?
            <br />
            Start building your portfolio today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Join thousands of professionals who have already created stunning portfolios with our platform. It&apos;s time to make your mark.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <RegisterLink>Get started</RegisterLink>
            </Button>
            <Button variant="outline" size="lg" asChild disabled hidden>
              <Link href="#features">Learn more <span aria-hidden="true">→</span></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

