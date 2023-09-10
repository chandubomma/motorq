import CustomerSideBar from "@/components/CustomerSideBar"

const Layout = ({children}) => {
  return (
    <div className="flex flex-row">
      <div>
        <CustomerSideBar/>
      </div>
      <div className="w-full ml-80">
        {children}
      </div>
    </div>
  )
}

export default Layout
