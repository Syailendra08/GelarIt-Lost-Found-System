export default function WelcomeSection({ user }) {

  return (
    <div>

      <h1 className="text-4xl font-bold text-blue-950">
        Hello, {user?.name}!
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome back to your personal portal.
        We're here to help you find what's yours.
      </p>

    </div>
  )
}