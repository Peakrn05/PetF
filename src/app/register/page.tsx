"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Input, Label, Button, Link, Separator } from "@heroui/react";
import { PawPrint } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field: string) => (value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }

    setLoading(true);
    try {
      await register(form.name, form.email, form.phone, form.password);
      router.push("/");
    } catch {
      setError("Registration failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
            <PawPrint className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-navy">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join PawCare to book pet services online</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField value={form.name} onChange={update("name")} isRequired>
              <Label>Full Name</Label>
              <Input placeholder="Your full name" />
            </TextField>
            <TextField type="email" value={form.email} onChange={update("email")} isRequired>
              <Label>Email Address</Label>
              <Input placeholder="you@example.com" />
            </TextField>
            <TextField value={form.phone} onChange={update("phone")}>
              <Label>Phone Number</Label>
              <Input placeholder="08X-XXX-XXXX" />
            </TextField>
            <TextField type="password" value={form.password} onChange={update("password")} isRequired>
              <Label>Password</Label>
              <Input placeholder="Min 6 characters" />
            </TextField>
            <TextField type="password" value={form.confirmPassword} onChange={update("confirmPassword")} isRequired>
              <Label>Confirm Password</Label>
              <Input placeholder="Repeat your password" />
            </TextField>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full mt-2" isDisabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <Separator className="my-6" />

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
