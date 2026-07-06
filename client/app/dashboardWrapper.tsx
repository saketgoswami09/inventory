import Navbar from "./(components)/Navbar";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`dark flex bg-gray-50 text-gray-500 w-full min-h-screen`}>
      Sidebar
      <main className={`flex flex-col w-full h-full py-7`}>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
