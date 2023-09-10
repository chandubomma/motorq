import AdminSideBar from "@/components/AdminSideBar"

const Layout = ({children}) => {
  return (
    <div className="flex flex-row">
      <div>
        <AdminSideBar/>
      </div>
      <div className="w-full ml-80">
        {children}
      </div>
    </div>
  )
}

export default Layout