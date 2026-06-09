import { Turnstile } from "@marsidev/react-turnstile";
import { useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function CaptchaGate({ children }: Props) {
  const [verified, setVerified] = useState(false);

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Turnstile
          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
          onSuccess={() => setVerified(true)}
        />
      </div>
    );
  }

  return <>{children}</>;
}