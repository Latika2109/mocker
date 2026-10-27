import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../../_components/AuthLayout";

export default function Page() {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
}
