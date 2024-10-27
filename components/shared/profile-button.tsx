"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "../ui/button";

import { CircleUser, User } from "lucide-react";

interface Props {
  handleSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ handleSignIn, className }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={handleSignIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} />
          Log in
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Profile
          </Button>
        </Link>
      )}
    </div>
  );
};
