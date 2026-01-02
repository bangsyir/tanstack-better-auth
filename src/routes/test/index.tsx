import { createFileRoute } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

const userMiddleware = createMiddleware().server(async ({ next }) => {
  const user = {
    name: 'test',
    email: 'test@gmail.com',
  }
  return next({
    context: {
      user,
    },
  })
})

export const Route = createFileRoute('/test/')({
  server: {
    middleware: [userMiddleware],
    handlers: {
      GET: async ({ context }) => {
        console.log(context)
        return new Response('Hello dunia')
      },
    },
  },
  component: RouteComponent,
  notFoundComponent: () => {
    return <p>This page doesn't exist!</p>
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return <div>{JSON.stringify(data)}</div>
}
