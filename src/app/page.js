import LoginCard from "@/components/LoginCard"

export default function Home() {
  return (
      <div>
          <div className="card-container flex min-h-screen gap-8 justify-center items-center">
            <LoginCard img='/admin1.jpg' typeOfUser='Admin' subText='Login as an Admin to Manage your customers' link='/auth/admin' />
            <LoginCard img='/customer3.jpg' typeOfUser='Customer' subText='Login as an Customer to see your progress' link='/auth/customer' />
        </div>
      </div>
  )
}
