
export default function AuthLayout({ 
  children 
}: { children: React.ReactNode }) {
  console.log("CLERK:SIGNIN/SIGNOUT");
  return (
    <div className="w-full h-svh flex justify-center items-center">
      {children}
    </div>
  )
}