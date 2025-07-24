// src/components/SignedIn.jsx
import { useAuth } from "./authcontext";

export default function SignedIn({ children }) {
  const { user } = useAuth();
  return user ? children : null;
}
