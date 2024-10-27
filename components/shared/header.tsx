"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { AuthModal, Container, ProfileButton, SearchInput } from "./index";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">Best pizza ever</p>
            </div>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton handleSignIn={() => setOpenAuthModal(true)} />
        </div>
      </Container>
    </header>
  );
};
