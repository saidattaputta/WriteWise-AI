import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight,
  Check,
  FileText,
  LockKeyhole,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Brand } from '../components/Navbar'
import { Button, ThemeToggle } from '../components/ui'
import {
  loginUser,
  registerUser,
} from '../services/authService'


const features = [
  [
    'Write without the blank page',
    'Go from rough idea to a polished draft in a few focused prompts.',
    WandSparkles,
  ],
  [
    'A voice that sounds like you',
    'Fine-tune tone, style, and detail for every piece of work.',
    Sparkles,
  ],
  [
    'Everything in one place',
    'Create, edit, organize, and export without breaking your flow.',
    FileText,
  ],
]


export function Landing() {
  return (
    <div className="min-h-screen">

      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">

        <Brand />

        <nav className="hidden gap-7 text-sm text-slate-600 md:flex dark:text-slate-300">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="flex items-center gap-1">

          <ThemeToggle />

          <Link
            className="hidden px-3 text-sm font-semibold sm:block"
            to="/login"
          >
            Log in
          </Link>

          <Link to="/register">
            <Button className="py-2">
              Start writing free
              <ArrowRight size={16} />
            </Button>
          </Link>

        </div>

      </header>


      <main>

        <section className="relative overflow-hidden px-5 pb-24 pt-16 text-center sm:pt-24">

          <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[650px] -translate-x-1/2 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-500/10" />

          <div className="mx-auto max-w-3xl">

            <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm dark:bg-slate-900 dark:text-indigo-300">
              <Sparkles size={14} />
              Your smartest writing partner
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Turn good ideas into{' '}
              <span className="text-indigo-600">
                great writing.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              WriteWise AI helps your team create clear, thoughtful
              content faster—from the first spark to the final sentence.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link to="/register">
                <Button className="w-full sm:w-auto">
                  Start writing for free
                  <ArrowRight size={17} />
                </Button>
              </Link>

              <Link to="/dashboard">
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Explore the workspace
                </Button>
              </Link>

            </div>

            <p className="mt-4 text-xs text-slate-500">
              No credit card required · 14-day Pro trial
            </p>

          </div>


          <div className="card mx-auto mt-16 max-w-5xl overflow-hidden p-2 text-left">

            <div className="rounded-xl bg-slate-950 p-5 text-slate-300 sm:p-8">

              <div className="flex gap-1.5">
                <i className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <i className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>

              <p className="mt-9 text-xs text-slate-500">
                WRITEWISE AI · BLOG INTRODUCTION
              </p>

              <p className="mt-3 text-xl font-medium text-white sm:text-3xl">
                The future of work is not a place. It’s a practice.
              </p>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Build a culture where your best work can happen anywhere,
                with the clarity and focus to make it count.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-lg bg-indigo-500/20 px-3 py-2 text-xs text-indigo-200">
                <Sparkles size={14} />
                Rewritten for a confident, thoughtful tone
              </div>

            </div>

          </div>

        </section>


        <section
          id="features"
          className="bg-white px-5 py-20 dark:bg-slate-950"
        >

          <div className="mx-auto max-w-6xl">

            <p className="text-center text-sm font-bold uppercase tracking-widest text-indigo-600">
              Built for better work
            </p>

            <h2 className="mx-auto mt-3 max-w-xl text-center text-3xl font-bold">
              A simpler way to make every word count.
            </h2>

            <div className="mt-12 grid gap-5 md:grid-cols-3">

              {features.map(([title, text, Icon]) => {

                const FeatureIcon = Icon as typeof WandSparkles

                return (
                  <article
                    key={title as string}
                    className="rounded-2xl border p-6"
                  >

                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10">
                      <FeatureIcon size={21} />
                    </div>

                    <h3 className="mt-5 font-semibold">
                      {title as string}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {text as string}
                    </p>

                  </article>
                )
              })}

            </div>

          </div>

        </section>

      </main>

    </div>
  )
}


const schema = z.object({
  email: z
    .string()
    .email('Enter a valid email'),

  password: z
    .string()
    .min(8, 'Use at least 8 characters'),

  name: z
    .string()
    .optional(),
})


type Form = z.infer<typeof schema>


export function Auth({
  register = false,
}: {
  register?: boolean
}) {

  const navigate = useNavigate()

  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)


  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })


  const onSubmit = async (data: Form) => {

    setServerError('')
    setLoading(true)

    try {

      /*
       * REGISTER
       */
      if (register) {

        if (!data.name?.trim()) {

          setServerError(
            'Please enter your full name.',
          )

          return
        }


        await registerUser({
          full_name: data.name.trim(),
          email: data.email,
          password: data.password,
        })


        /*
         * Registration succeeded.
         * Send the user to login.
         */
        navigate('/login')

        return
      }


      /*
       * LOGIN
       */
      await loginUser({
        email: data.email,
        password: data.password,
      })


      /*
       * loginUser() already stores
       * the JWT in localStorage.
       */
      navigate('/dashboard')

    } catch (error: any) {

      console.error(
        'Authentication error:',
        error,
      )


      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        'Something went wrong. Please try again.'


      setServerError(message)

    } finally {

      setLoading(false)

    }
  }


  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT SIDE */}

      <section className="hidden bg-indigo-700 p-12 text-white lg:flex lg:flex-col">

        <Brand />

        <div className="my-auto max-w-md">

          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
            <WandSparkles />
          </span>

          <h1 className="mt-6 text-4xl font-bold">
            Write your next great thing.
          </h1>

          <p className="mt-4 leading-7 text-indigo-100">
            Join thousands of people who turn their ideas
            into clear, impactful writing with WriteWise AI.
          </p>

          <div className="mt-9 space-y-3 text-sm">

            {[
              'Write in your own voice',
              'Get unstuck in seconds',
              'Keep your work beautifully organized',
            ].map((x) => (

              <p
                className="flex gap-3"
                key={x}
              >
                <Check size={18} />
                {x}
              </p>

            ))}

          </div>

        </div>

        <p className="text-sm text-indigo-200">
          © 2026 WriteWise AI
        </p>

      </section>


      {/* RIGHT SIDE */}

      <section className="relative flex items-center justify-center p-6">

        <div className="absolute left-5 top-5 lg:hidden">
          <Brand />
        </div>


        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold">
            {register
              ? 'Create your account'
              : 'Welcome back'}
          </h1>


          <p className="mt-2 text-sm text-slate-500">
            {register
              ? 'Start writing with more confidence today.'
              : 'Sign in to continue your writing journey.'}
          </p>


          <form
            className="mt-8 space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* FULL NAME */}

            {register && (

              <label className="label">

                Full name

                <input
                  className="input mt-1.5"
                  placeholder="Alex Smith"
                  {...field('name')}
                />

              </label>

            )}


            {/* EMAIL */}

            <label className="label">

              Email address

              <input
                className="input mt-1.5"
                placeholder="you@company.com"
                {...field('email')}
              />

              {errors.email && (

                <small className="text-rose-600">
                  {errors.email.message}
                </small>

              )}

            </label>


            {/* PASSWORD */}

            <label className="label">

              Password

              <div className="relative mt-1.5">

                <LockKeyhole
                  className="absolute left-3 top-3 text-slate-400"
                  size={17}
                />

                <input
                  type="password"
                  className="input pl-10"
                  placeholder="••••••••"
                  {...field('password')}
                />

              </div>

              {errors.password && (

                <small className="text-rose-600">
                  {errors.password.message}
                </small>

              )}

            </label>


            {/* FORGOT PASSWORD */}

            {!register && (

              <p className="text-right text-xs font-semibold text-indigo-600">
                Forgot password?
              </p>

            )}


            {/* SERVER ERROR */}

            {serverError && (

              <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {serverError}
              </div>

            )}


            {/* SUBMIT */}

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={loading}
            >

              {loading
                ? register
                  ? 'Creating account...'
                  : 'Signing in...'
                : register
                  ? 'Create account'
                  : 'Sign in'}

              {!loading && (
                <ArrowRight size={17} />
              )}

            </Button>

          </form>


          {/* SWITCH LOGIN / REGISTER */}

          <p className="mt-6 text-center text-sm text-slate-500">

            {register
              ? 'Already have an account?'
              : 'New to WriteWise?'}

            {' '}

            <Link
              className="font-semibold text-indigo-600"
              to={
                register
                  ? '/login'
                  : '/register'
              }
            >

              {register
                ? 'Log in'
                : 'Create an account'}

            </Link>

          </p>


          <Link
            to="/"
            className="mt-8 block text-center text-sm text-slate-500"
          >
            ← Back to home
          </Link>

        </div>

      </section>

    </div>
  )
}