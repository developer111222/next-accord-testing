import React from 'react'

const Footer = () => {
  return (
<footer className="bg-black text-white py-10">
  <div className="max-w-7xl mx-auto px-6 sm:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

      {/* Column 1: Icons and Text */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
        <img src="logo.png" className="w-60 " />
        
        </div>
        <p className="text-sm">
        s Cable, a leading cable manufacturing company, has been at the forefront of providing high-quality wiring solutions since its inception. With a commitment to innovation, reliability, and customer satisfaction, Accords Cable has become a trusted name in the industry.
        </p>
      </div>

      {/* Column 2: Quick Links */}
      <div className="flex flex-col space-y-2">
        <h3 className="font-semibold text-lg">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
          <li><a href="product" className="hover:text-gray-400">Products</a></li>
          <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
          <li><a href="/product/ZHFR-wires" className="hover:text-gray-400">ZHFR Wires</a></li>
          <li><a href="/product/FR-wires" className="hover:text-gray-400">FR Wires</a></li>
        </ul>
      </div>

      {/* Column 3: Products */}
      <div className="flex flex-col space-y-2">
        <h3 className="font-semibold text-lg">Products</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/product/co-axial-cable" className="hover:text-gray-400">Co-Axial Cable</a></li>
          <li><a href="/product/multicore-flexible-cable" className="hover:text-gray-400">Multicore Flexible Cable</a></li>
          <li><a href="/product/submersible-cable" className="hover:text-gray-400">Submersible Cable</a></li>
          <li><a href="/product/service-wire" className="hover:text-gray-400">Service Wire</a></li>
          <li><a href="/product/FRLSH-wires" className="hover:text-gray-400">FRLSH Wires</a></li>
        </ul>
      </div>

      {/* Column 4: Contact and Social Icons */}
      <div className="flex flex-col space-y-4">
        <h3 className="font-semibold text-lg">Contact Us</h3>
        <p className="text-sm">Phone:+91-9312219262</p>
        <p className="text-sm">Email: accord_cables@yahoo.co.in</p>
        <p className="text-sm">Address: BAWANA INDUSTRIAL AREA J -98 , SEC-4, DELHI-110039</p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4">
          <a href="#" className="text-xl hover:text-gray-400"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-xl hover:text-gray-400"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-xl hover:text-gray-400"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-xl hover:text-gray-400"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>

    </div>
    <div className="text-center text-sm mt-8">
      <p>&copy; 2025 Company Name. All Rights Reserved.</p>
    </div>
  </div>
</footer>

  )
}

export default Footer
