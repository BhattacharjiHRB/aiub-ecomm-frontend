import LoginForm from "@/components/forms/loginForm";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-between m-auto p-10 ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Section */}
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Secure Authentication Platform
              </div>

              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-foreground">
                Welcome Back to{" "}
                <span className="text-blue-600">AIUB E-comm</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Access your account securely and manage your products,
                analytics, customers, and business operations effortlessly from
                one place.
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border bg-background/80 p-5 shadow-sm transition hover:shadow-md">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold">Protected Access</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Advanced authentication and account protection.
                </p>
              </div>

              <div className="rounded-2xl border bg-background/80 p-5 shadow-sm transition hover:shadow-md">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold">Secure Login</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Encrypted sessions and reliable account security.
                </p>
              </div>

              <div className="rounded-2xl border bg-background/80 p-5 shadow-sm transition hover:shadow-md">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold">Modern Experience</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Clean, responsive, and optimized user interface.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-xl " />

            <div className="relative rounded-3xl border p-8 shadow-2xl backdrop-blur">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight">Sign Up</h2>

                <p className="mt-2 text-muted-foreground">
                  Make an account and Enjoy!
                </p>
              </div>

              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
