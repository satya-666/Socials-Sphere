// src/components/SignedOut.jsx
import { useAuth } from "./authcontext";

export default function SignedOut({ children }) {
  const { user } = useAuth();
  return !user ? children : null;
}
