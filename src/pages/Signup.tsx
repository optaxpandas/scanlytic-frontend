
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = async (data: any) => {
    try {
      const response = await fetch("http://9.169.249.118:8000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        toast.error("Unable to connect to the server. Please check your network or contact support.");
      } else {
        toast.error("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel with image/design */}
      <div className="hidden md:flex md:flex-1 bg-gradient-to-br from-blue-600/90 to-primary/90 text-white">
        <div className="flex flex-col justify-center px-10 md:px-16 max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-6">Join our platform</h2>
          <p className="text-lg opacity-90 mb-10">
            Create an account to access our suite of data extraction tools and services.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-medium mb-2">Why Sign Up?</h3>
              <ul className="list-disc list-inside text-sm opacity-80 space-y-2">
                <li>Unlimited QR code scans</li>
                <li>Advanced table extraction features</li>
                <li>Save and organize your extracted data</li>
                <li>Export data in multiple formats</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right panel with form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-10 inline-block">
            <Logo />
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-muted-foreground mb-8">Sign up to get started with QRExtract</p>
          
          <AuthForm type="signup" onSubmit={handleSignup} />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
