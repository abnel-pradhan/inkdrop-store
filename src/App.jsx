import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Menu, CheckCircle, Package, ArrowRight, Truck, ShieldCheck, Phone, Sparkles, Wand2, Image as ImageIcon, Type, Loader2 } from 'lucide-react';

/* --- MOCK DATA --- */
const PRODUCTS = [
  {
    id: 1,
    name: "Developer Mode On",
    price: 699,
    category: "Tech",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    description: "Premium cotton tee for late night coding sessions. 100% Bio-washed Cotton.",
    colors: ["Black", "Navy Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "Anime Streetwear",
    price: 799,
    category: "Anime",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    description: "Oversized fit with high-density puff print. Street style aesthetic.",
    colors: ["White", "Beige", "Black"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 3,
    name: "Hustle Harder",
    price: 599,
    category: "Motivation",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
    description: "Minimalist typography design. Perfect for entrepreneurs.",
    colors: ["Black", "Grey", "Maroon"],
    sizes: ["S", "M", "L", "XL"],
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-indigo-600 cursor-pointer" onClick={() => setView('home')}>INKDROP</h1>
          <button className="relative p-2 text-gray-600">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {view === 'home' && (
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-indigo-600 text-white p-8 rounded-2xl mb-8">
            <h2 className="text-4xl font-bold mb-4">Design Your Own</h2>
            <p className="mb-6">Use AI to generate custom prints.</p>
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold">Open Studio</button>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Fresh Drops</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map(p => (
              <div key={p.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={p.image} alt={p.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-gray-500 text-sm">{p.category}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-xl">₹{p.price}</span>
                    <button 
                      onClick={() => setCart([...cart, p])}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}