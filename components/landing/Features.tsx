import { Layers, Palette, Zap } from 'lucide-react'

const features = [
  {
    name: 'Customizable Templates',
    description: 'Choose from a variety of professional templates and customize them to fit your style.',
    icon: Palette,
  },
  {
    name: 'Easy Project Showcase',
    description: 'Effortlessly add and organize your projects with our intuitive interface.',
    icon: Layers,
  },
  {
    name: 'Quick Setup',
    description: 'Get your portfolio up and running in minutes with our streamlined process.',
    icon: Zap,
  },
]

export function Features() {
  return (
    <div className="bg-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Build faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to create your portfolio
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our portfolio builder provides all the tools you need to showcase your skills and projects professionally.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

