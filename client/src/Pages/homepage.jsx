import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import ScrollToggleButton from "../components/scrollButton";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="homepage">
      <ScrollToggleButton />
      {/* Navbar */}
      <nav className="bg-sky-700 w-full p-4 flex justify-between items-center fixed top-0 left-0 z-20 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/img/logoF.jpg" alt="Finverse logo" className="w-8 h-6" />
          <h1 className="text-xl font-bold text-black">Finverse</h1>
        </div>

        {/* Hamburger Icon (Shown on Small Screens) */}
        <button
          className="text-black md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-black">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <Link
              to="/loginpage"
              className="bg-blue-700 text-amber-400 px-4 py-1 rounded-3xl"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu (Shown when `isOpen` is true) */}
        {isOpen && (
          <ul className="absolute top-16 left-0 w-full bg-sky-700 flex flex-col text-white items-center space-y-4 py-4 md:hidden z-10 shadow-lg">
            <li>
              <a href="#" onClick={() => setIsOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setIsOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setIsOpen(false)}>
                Contact
              </a>
            </li>
            <li>
              <Link
                to="/loginpage"
                className="bg-white text-sky-700 px-4 py-1 rounded-3xl"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        )}
      </nav>

      {/* Hero Section */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-amber-100"
        style={{
          backgroundImage: "url('/img/pexels-karolina-grabowska-4475523.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-4xl md:text-6xl font-bold text-center">
          Welcome to Finverse
        </h1>
      </div>

      {/* About Section */}
      <section id="about" className="mt-20 px-8 md:px-20">
        <h2 className="text-3xl font-bold text-center">About</h2>

        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
          {/* About Image */}
          <img
            src="/img/pexels-olia-danilevich-5466785.jpg"
            alt="About Finverse"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />

          {/* About Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-gray-700">
              Finverse is a modern financial budgeting app designed to help you
              track your income, expenses, and savings effortlessly. Set
              budgets, analyze your spending habits, and gain full control over
              your finances!
            </p>

            {/* Call-to-Action Button */}
            <Link to="/signupPage">
              <button className="mt-4 px-6 py-2 bg-sky-700 text-white font-semibold rounded-md hover:bg-sky-800">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section id="products" className="py-16 bg-gray-100 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl font-bold text-center text-black mb-8">
            Our Products
          </h2>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Home Account */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src="\img\Home.jpg"
                alt="Home Account"
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-sky-700">Home</h3>
                <p className="text-gray-600 mt-2">
                  A personal account designed for everyday budgeting and
                  savings.
                </p>
              </div>
            </article>

            {/* Office Account */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src="\img\office.jpg"
                alt="Office Account"
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-sky-700">Office</h3>
                <p className="text-gray-600 mt-2">
                  Manage office expenses and track budgets with ease.
                </p>
              </div>
            </article>

            {/* Personal Account */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src="\img\pexels-karolina-grabowska-4475523.jpg"
                alt="Personal Account"
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-sky-700">Personal</h3>
                <p className="text-gray-600 mt-2">
                  Your own financial management tool for personal use.
                </p>
              </div>
            </article>

            {/* Business Account */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src="\img\pexels-anntarazevich-14751274.jpg"
                alt="Business Account"
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-sky-700">Business</h3>
                <p className="text-gray-600 mt-2">
                  A specialized account for small businesses and freelancers.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="bg-sky-900 text-white py-8 mt-16">
        <div className="container mx-auto px-8 grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Finverse */}
          <div>
            <h3 className="text-xl font-bold">Finverse</h3>
            <p className="text-sm mt-2 text-gray-300">
              Your all-in-one financial budgeting tool. Track expenses, set
              budgets, and take control of your finances with ease!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/account" className="hover:text-gray-300">
                  My Account
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-gray-300">
                  Setup Budget
                </a>
              </li>
              <li>
                <a href="/analysis" className="hover:text-gray-300">
                  Analysis
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <a href="#" className="hover:text-gray-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-6 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Finverse. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
