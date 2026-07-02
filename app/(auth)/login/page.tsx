import PassportAuth from "@/features/auth/components/PassportAuth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ece8] p-4">
      <PassportAuth />
    </div>
  );
}