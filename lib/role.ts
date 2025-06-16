import { auth } from '@clerk/nextjs/server';

type Roles = "admin" | "user" | "manager";

type SessionClaimsWithRole = {
  metadata?: {
    role?: Roles;
  };
};

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  const claims = sessionClaims as SessionClaimsWithRole;

  return claims?.metadata?.role === role;
};
