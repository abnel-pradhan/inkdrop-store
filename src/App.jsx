import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, LogOut, Package, ArrowRight, Truck, ShieldCheck, Phone, Sparkles, Star, Zap, Menu, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

/* --- FONTS & STYLES INJECTION --- */
const FontStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@700;800;900&display=swap');
      
      .font-heading { font-family: 'Montserrat', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      
      .electric-text {
        color: #00A8E8;
      }
      .electric-bg {
        background-color: #00A8E8;
      }
      .navy-bg {
        background-color: #0A192F;
      }
    `}
  </style>
);

/* --- MOCK DATA --- */
const PRODUCTS = [
  {
    id: 1,
    name: "Developer Mode On",
    price: 699,
    originalPrice: 999,
    category: "Tech",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    description: "Premium cotton tee for late night coding sessions. 100% Bio-washed Cotton. Features a glow-in-the-dark syntax print.",
    colors: ["Black", "Navy Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: true
  },
  {
    id: 2,
    name: "Anime Streetwear",
    price: 799,
    originalPrice: 1299,
    category: "Anime",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    description: "Oversized fit with high-density puff print. Street style aesthetic. Heavyweight fabric for the perfect drape.",
    colors: ["White", "Beige", "Black"],
    sizes: ["M", "L", "XL"],
    bestseller: true
  },
  {
    id: 3,
    name: "Hustle Harder",
    price: 599,
    originalPrice: 899,
    category: "Motivation",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
    description: "Minimalist typography design. Perfect for entrepreneurs. Breathable fabric for all-day comfort.",
    colors: ["Black", "Grey", "Maroon"],
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  },
  {
    id: 4,
    name: "Abstract Glitch",
    price: 749,
    originalPrice: 1199,
    category: "Art",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&q=80&w=800",
    description: "Futuristic glitch art print on premium heavy gauge fabric. A unique statement piece.",
    colors: ["White", "Black"],
    sizes: ["S", "M", "L", "XL"],
    bestseller: false
  }
];

const TESTIMONIALS = [
  { id: 1, name: "Alex K.", text: "The fabric quality is insane. Feels like a luxury brand but affordable.", role: "Developer" },
  { id: 2, name: "Sarah M.", text: "Shipping was super fast. The print hasn't faded after 10 washes.", role: "Designer" },
  { id: 3, name: "Rohan D.", text: "Finally found oversized tees that actually fit well. 10/10.", role: "Student" }
];

/* --- COMPONENTS --- */

const Navbar = ({ cartCount, onViewChange, user, onLogout, onCartOpen }) => (
  <nav className="fixed w-full z-50 bg-[#0A192F]/90 backdrop-blur-md border-b border-white/10 shadow-lg font-body">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer group" onClick={() => onViewChange('home')}>
          <div className="bg-[#00A8E8] p-2 rounded-lg mr-3 group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(0,168,232,0.5)]">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white font-heading">
            INK<span className="text-[#00A8E8]">DROP</span>
          </h1>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {['Shop', 'Featured', 'About', 'Reviews'].map((item) => (
            <button key={item} onClick={() => onViewChange('home')} className="text-gray-300 hover:text-[#00A8E8] font-semibold text-sm uppercase tracking-wider transition-colors">
              {item}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-sm font-bold text-gray-200 hidden sm:block">{user.name}</span>
              <button onClick={onLogout} className="text-gray-400 hover:text-[#00A8E8] transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onViewChange('login')}
              className="text-sm font-bold text-[#0A192F] bg-[#00A8E8] hover:bg-white px-6 py-2.5 rounded-full transition-all shadow-lg hover:shadow-[#00A8E8]/50 transform hover:-translate-y-0.5"
            >
              Log In
            </button>
          )}
          
          <button 
            onClick={onCartOpen}
            className="p-3 text-white hover:text-[#00A8E8] relative transition-all"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-white text-[#0A192F] text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-[#050d1a] text-white pt-16 pb-8 border-t border-white/5 font-body">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-black font-heading mb-4 tracking-tighter">INK<span className="text-[#00A8E8]">DROP</span></h2>
          <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
            Empowering creators through fashion. We build premium streetwear that tells your story before you say a word.
          </p>
          <div className="flex space-x-4">
            {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00A8E8] hover:text-[#0A192F] transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-6 text-[#00A8E8]">Quick Links</h3>
          <ul className="space-y-4 text-gray-400">
            {['Shop All', 'New Arrivals', 'Track Order', 'FAQ', 'Returns'].map(link => (
              <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-6 text-[#00A8E8]">Stay in the Loop</h3>
          <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive drops and 10% off.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:border-[#00A8E8]" />
            <button className="bg-[#00A8E8] text-[#0A192F] px-4 rounded-lg font-bold hover:bg-white transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
        &copy; 2025 Inkdrop Store. All rights reserved. Designed in India.
      </div>
    </div>
  </footer>
);

/* --- PAGE VIEWS --- */

const HomeView = ({ onProductSelect, onAdd }) => (
  <div className="pt-20 bg-white font-body">
    {/* HERO SECTION */}
    <div className="relative bg-[#0A192F] text-white overflow-hidden min-h-[650px] flex items-center">
      <div className="absolute inset-0 z-0 opacity-40">
        <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Hero Background" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/90 to-transparent z-10"></div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block py-1 px-3 rounded-full bg-[#00A8E8]/20 border border-[#00A8E8]/50 text-[#00A8E8] text-sm font-bold mb-6 tracking-wide">
            PREMIUM COLLECTION 2025
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 leading-tight">
            WEAR YOUR <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8E8] to-white">STORY.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Fashion that speaks louder than words. Minimalist designs, premium fabrics, and a fit that feels tailored just for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#00A8E8] text-[#0A192F] px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(0,168,232,0.4)] flex items-center gap-2">
              Shop Now <ArrowRight size={20} />
            </button>
            <button className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              View Lookbook
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* FEATURED SECTION */}
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-[#0A192F] mb-4">BESTSELLERS</h2>
          <div className="h-1 w-20 bg-[#00A8E8] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600">The community's favorite picks this month.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.filter(p => p.bestseller).map(product => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-80 overflow-hidden cursor-pointer" onClick={() => onProductSelect(product)}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-[#0A192F] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Bestseller
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-lg text-[#0A192F] mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-[#00A8E8] font-bold text-xl">₹{product.price}</span>
                  <button 
                    onClick={() => onAdd(product, product.sizes[0], product.colors[0])}
                    className="bg-gray-100 hover:bg-[#0A192F] text-[#0A192F] hover:text-white p-2 rounded-full transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ALL PRODUCTS GRID */}
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-heading font-black text-[#0A192F]">ALL DROPS</h2>
          </div>
          <button className="text-[#00A8E8] font-bold hover:text-[#0A192F] transition-colors flex items-center gap-1">
            Filter <Menu size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#00A8E8]/30 transition-all duration-300">
              <div className="relative h-72 overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onProductSelect(product)}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:mix-blend-normal transition-all duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                   <button className="w-full bg-white text-[#0A192F] font-bold py-3 rounded-xl shadow-lg hover:bg-[#00A8E8] hover:text-white transition-colors">
                     View Details
                   </button>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
                <p className="text-gray-900 font-bold">₹{product.price} <span className="text-gray-400 text-sm line-through font-normal ml-2">₹{product.originalPrice}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ABOUT SECTION */}
    <div className="bg-[#0A192F] text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden h-[500px] shadow-2xl">
             <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Lifestyle" />
             <div className="absolute inset-0 bg-[#00A8E8]/20 mix-blend-overlay"></div>
          </div>
          <div>
            <span className="text-[#00A8E8] font-bold tracking-widest uppercase text-sm mb-2 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 leading-tight">CRAFTED FOR THE <span className="text-[#00A8E8]">BOLD</span>.</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Inkdrop isn't just a clothing brand; it's a movement. We believe that what you wear is an extension of your creativity.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Born in a small studio, we've grown into a community of artists, developers, and visionaries who refuse to blend in. Every piece is designed to make a statement.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
               <div className="border-l-4 border-[#00A8E8] pl-4">
                 <h4 className="font-bold text-xl mb-1">100%</h4>
                 <p className="text-gray-400 text-sm">Premium Cotton</p>
               </div>
               <div className="border-l-4 border-[#00A8E8] pl-4">
                 <h4 className="font-bold text-xl mb-1">24/7</h4>
                 <p className="text-gray-400 text-sm">Customer Support</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* TESTIMONIALS */}
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-heading font-black text-[#0A192F] text-center mb-16">COMMUNITY LOVE</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#00A8E8]/30 transition-all">
               <div className="flex text-[#00A8E8] mb-4">
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
               </div>
               <p className="text-gray-700 text-lg mb-6 italic">"{t.text}"</p>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-[#0A192F] rounded-full flex items-center justify-center text-white font-bold">
                   {t.name[0]}
                 </div>
                 <div>
                   <h4 className="font-bold text-[#0A192F]">{t.name}</h4>
                   <p className="text-xs text-gray-500 uppercase font-bold">{t.role}</p>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProductDetails = ({ product, onAdd, onBack }) => {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="mb-8 text-gray-500 hover:text-[#00A8E8] font-bold flex items-center gap-2 transition-colors">
          ← Back to Shop
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="bg-gray-100 rounded-3xl overflow-hidden relative shadow-inner aspect-[4/5]">
             <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="text-[#00A8E8] font-bold uppercase tracking-wider text-sm mb-2">{product.category}</span>
            <h1 className="text-4xl lg:text-5xl font-heading font-black text-[#0A192F] mb-6 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-[#0A192F]">₹{product.price}</span>
              <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="bg-[#00A8E8]/10 text-[#00A8E8] px-2 py-1 rounded text-xs font-bold">In Stock</span>
            </div>

            <p className="text-gray-600 text-lg mb-10 leading-relaxed border-b border-gray-100 pb-10">
              {product.description}
            </p>

            <div className="space-y-8 mb-10">
              <div>
                <h3 className="font-bold text-[#0A192F] mb-3 uppercase text-sm tracking-wide">Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`w-12 h-12 rounded-lg font-bold border-2 transition-all ${
                        size === s 
                        ? 'border-[#00A8E8] text-[#00A8E8] bg-[#00A8E8]/5' 
                        : 'border-gray-200 text-gray-500 hover:border-gray-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#0A192F] mb-3 uppercase text-sm tracking-wide">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        color === c ? 'border-[#00A8E8]' : 'border-transparent'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full border border-gray-200" style={{ backgroundColor: c.toLowerCase() === 'navy blue' ? '#000080' : c.toLowerCase() }}></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => onAdd(product, size, color)}
                className="flex-1 bg-[#00A8E8] text-[#0A192F] rounded-full py-4 font-bold text-lg hover:bg-[#0A192F] hover:text-white transition-all shadow-lg shadow-[#00A8E8]/20"
              >
                Add to Cart
              </button>
              <button className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors">
                 <Star size={24} />
              </button>
            </div>
            
            <div className="mt-8 flex gap-6 text-sm text-gray-500 font-medium">
               <div className="flex items-center gap-2"><Truck size={18} className="text-[#00A8E8]"/> Fast Delivery</div>
               <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-[#00A8E8]"/> Secure Pay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  
  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4 font-body">
      <div className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading font-black text-[#0A192F] mb-2">WELCOME BACK</h2>
          <p className="text-gray-500">Sign in to access your account</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin({ name: email.split('@')[0], email }); }} className="space-y-6">
           <div>
             <label className="block text-xs font-bold text-gray-900 uppercase mb-2">Email Address</label>
             <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8] transition-all" />
           </div>
           <div>
             <label className="block text-xs font-bold text-gray-900 uppercase mb-2">Password</label>
             <input required type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8] transition-all" />
           </div>
           <button className="w-full bg-[#00A8E8] text-[#0A192F] py-4 rounded-xl font-bold text-lg hover:bg-[#0A192F] hover:text-white transition-all">
             Sign In
           </button>
        </form>
      </div>
    </div>
  );
};

const CheckoutView = ({ cart, onCheckout, onBack, loading, checkoutData, setCheckoutData }) => (
  <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 font-body">
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 text-gray-500 font-bold">← Back to Cart</button>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
         <div className="p-8 md:p-12">
            <h2 className="text-2xl font-heading font-black text-[#0A192F] mb-8">SHIPPING INFO</h2>
            <form id="checkout-form" onSubmit={onCheckout} className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Full Name" className="col-span-2 bg-gray-50 border-none rounded-xl px-4 py-3" value={checkoutData.fullName} onChange={e => setCheckoutData({...checkoutData, fullName: e.target.value})} />
                  <input required type="email" placeholder="Email" className="bg-gray-50 border-none rounded-xl px-4 py-3" value={checkoutData.email} onChange={e => setCheckoutData({...checkoutData, email: e.target.value})} />
                  <input required type="tel" placeholder="Phone" className="bg-gray-50 border-none rounded-xl px-4 py-3" value={checkoutData.phone} onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})} />
                  <textarea required placeholder="Full Address" className="col-span-2 bg-gray-50 border-none rounded-xl px-4 py-3 h-32" value={checkoutData.address} onChange={e => setCheckoutData({...checkoutData, address: e.target.value})}></textarea>
               </div>
            </form>
         </div>
         <div className="bg-[#0A192F] p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-heading font-black mb-8">YOUR ORDER</h2>
              <div className="space-y-4 mb-8">
                 {cart.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-gray-300">
                       <span className="text-sm">{item.name} <span className="text-[#00A8E8]">x{item.quantity}</span></span>
                       <span className="font-bold">₹{item.price * item.quantity}</span>
                    </div>
                 ))}
              </div>
              <div className="border-t border-white/10 pt-6 flex justify-between items-center text-xl font-bold">
                 <span>Total</span>
                 <span className="text-[#00A8E8]">₹{cart.reduce((t, i) => t + i.price * i.quantity, 0)}</span>
              </div>
            </div>
            <button form="checkout-form" disabled={loading} className="w-full bg-[#00A8E8] text-[#0A192F] py-4 rounded-xl font-bold text-lg mt-8 hover:bg-white transition-all disabled:opacity-50">
               {loading ? 'Processing...' : 'Place Order'}
            </button>
         </div>
      </div>
    </div>
  </div>
);

const SuccessView = ({ onHome }) => (
  <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4 font-body">
    <div className="text-center">
      <div className="w-24 h-24 bg-[#00A8E8] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,168,232,0.5)]">
        <Sparkles size={48} className="text-[#0A192F]" />
      </div>
      <h2 className="text-5xl font-heading font-black text-white mb-4">YOU'RE SET!</h2>
      <p className="text-gray-400 text-lg mb-10">Your order has been confirmed. Welcome to the club.</p>
      <button onClick={onHome} className="bg-white text-[#0A192F] px-10 py-4 rounded-full font-bold hover:bg-[#00A8E8] transition-colors">
        Back to Home
      </button>
    </div>
  </div>
);

/* --- MAIN APP --- */

export default function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState({ fullName: '', email: '', phone: '', address: '' });

  const addToCart = (product, size, color) => {
    setCart([...cart, { ...product, size, color, quantity: 1, cartId: Date.now() }]);
    setIsCartOpen(true);
  };
  const removeFromCart = (id) => setCart(cart.filter(i => i.cartId !== id));
  
  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/order', { method: 'POST', body: JSON.stringify({ customerData: checkoutData, items: cart }) });
      setCart([]); setView('success');
    } catch (e) { alert('Order Error'); } finally { setLoading(false); }
  };

  return (
    <div className="antialiased selection:bg-[#00A8E8] selection:text-[#0A192F]">
      <FontStyles />
      <Navbar cartCount={cart.length} user={user} onViewChange={setView} onLogout={() => setUser(null)} onCartOpen={() => setIsCartOpen(true)} />

      <main>
        {view === 'home' && <HomeView onProductSelect={(p) => { setSelectedProduct(p); setView('product'); }} onAdd={addToCart} />}
        {view === 'product' && selectedProduct && <ProductDetails product={selectedProduct} onAdd={addToCart} onBack={() => setView('home')} />}
        {view === 'login' && <LoginView onLogin={(u) => { setUser(u); setView('home'); }} />}
        {view === 'checkout' && <CheckoutView cart={cart} onCheckout={handleCheckout} onBack={() => setView('home')} loading={loading} checkoutData={checkoutData} setCheckoutData={setCheckoutData} />}
        {view === 'success' && <SuccessView onHome={() => setView('home')} />}
      </main>

      <Footer />

      {/* Slide Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] font-body">
          <div className="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
               <h2 className="text-xl font-heading font-black text-[#0A192F]">YOUR CART ({cart.length})</h2>
               <button onClick={() => setIsCartOpen(false)}><X className="text-gray-400 hover:text-[#0A192F]" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               {cart.length === 0 ? <p className="text-center text-gray-500 mt-20">Cart is empty</p> : cart.map(item => (
                 <div key={item.cartId} className="flex gap-4">
                    <img src={item.image} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                    <div className="flex-1">
                       <h4 className="font-bold text-[#0A192F]">{item.name}</h4>
                       <p className="text-sm text-gray-500">{item.size} / {item.color}</p>
                       <div className="flex justify-between mt-2">
                          <span className="font-bold text-[#00A8E8]">₹{item.price}</span>
                          <button onClick={() => removeFromCart(item.cartId)} className="text-xs font-bold text-red-500">REMOVE</button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50">
                 <button onClick={() => { setIsCartOpen(false); setView('checkout'); }} className="w-full bg-[#0A192F] text-white py-4 rounded-xl font-bold hover:bg-[#00A8E8] transition-colors">
                    Checkout • ₹{cart.reduce((t, i) => t + i.price * i.quantity, 0)}
                 </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}