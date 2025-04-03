function Footer() {
  return (
    <footer className="flex flex-col bg-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 bg-blur-3xl backdrop-blur-3xl rounded-lg px-4 md:px-8 py-4">
        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center md:text-left">
          Hire<span className="text-[#ffd82d]">Orbit</span>
          <p className="text-xs md:text-sm font-light">Made with ❤️ by Team Glucon D </p>
        </span>
        <div className="flex items-center space-x-4 md:space-x-6"> 
          <span className="text-sm md:text-base">Github</span> 
          <span className="text-sm md:text-base">Mail</span>
          <button className="bg-gray-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-gray-200 transition-colors text-sm md:text-base">
            Report Bug
          </button>
        </div>
      </div>
      <p className="text-xs md:text-sm text-center mt-4">© {new Date().getFullYear()} Intellica. All rights reserved.</p> 
    </footer>
  );
}
export default Footer;