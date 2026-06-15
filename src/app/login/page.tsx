"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, TextField, Input, Label, Button, Link, Separator, Spinner } from "@heroui/react";
import { PawPrint } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Spinner /></div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push(redirect);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md border border-gray-200">
        <Card.Content className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
              <PawPrint className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-navy">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Sign in to manage your reservations</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField type="email" value={email} onChange={setEmail} isRequired>
              <Label>Email</Label>
              <Input placeholder="you@example.com" />
            </TextField>
            <TextField type="password" value={password} onChange={setPassword} isRequired>
              <Label>Password</Label>
              <Input placeholder="Your password" />
            </TextField>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="bg-primary text-white hover:bg-primary-dark w-full" isDisabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <Separator className="my-6" />

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-medium">Sign up</Link>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
