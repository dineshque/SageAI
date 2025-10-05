"use client";

import Link from "next/link";
import { BrainCircuit, User, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, studentProfile, signOutUser } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutUser();
    router.push("/");
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card border-b">
      <Link href="/" className="flex items-center justify-center">
        <BrainCircuit className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-bold font-headline">Sage AI</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {user && studentProfile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL ?? ""} alt={studentProfile.name} />
                  <AvatarFallback>{studentProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                <User className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button asChild variant="ghost">
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/signup">
                Sign Up
              </Link>
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
