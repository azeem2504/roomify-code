"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "./dashboard/_components/Header";
import ExampleConversion from "../components/ExampleConversion";
import Footer from "../components/Footer";
import CardSection from "@/components/CardSection";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      <Header>
        {isSignedIn ? (
          <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
            Buy More Credits
          </button>
        ) : (
          <button className="bg-purple-700 text-white px-4 py-2 cursor-pointer rounded hover:bg-purple-800" onClick={() => router.push("/sign-in")}>
            LogIn / SignUp
          </button>
        )}
      </Header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-[#f7f8fc] to-white text-center py-24 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              AI Room and Home
              <br />
              <span className="text-[#5b21b6]">Interior Design</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
              Transform Your Space with AI: Effortless Room & Home Interior Design at Your Fingertips!
            </p>

            {/* Get Started Button */}
            <div className="mt-8">
              <button
                onClick={handleGetStarted}
                className="bg-[#5b21b6] hover:bg-[#4c1d95] text-white px-6 py-3 cursor-pointer rounded-md text-lg transition"
              >
                Get started <span className="ml-2">&gt;</span>
              </button>
            </div>
          </div>
        </section>

        <section className="my-12 px-4">
          <ExampleConversion />
        </section>

        <CardSection />
      </main>

      <Footer />
    </div>
  );
}
