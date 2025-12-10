import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, User, LogOut, Package, ArrowRight, Truck, ShieldCheck, Phone, Sparkles, Wand2, Menu, Search, Filter } from 'lucide-react';

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
  }
];

/* --- COMPONENTS --- */

const Navbar = ({ cartCount, onViewChange, user, onLogout, onCartOpen }) => (
  <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 backdrop-blur-lg bg-opacity-80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center cursor-pointer" onClick={() => onViewChange('home')}>
          <h1 className="text-2xl font-black text-indigo-600 tracking-tighter hover:scale-105 transition-transform">INKDROP</h1>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <button onClick={() => onViewChange('home')} className="text-gray-600 hover:text-indigo-600 font-medium">Shop</button>
          <button onClick={() => onViewChange('home')} className="text-gray-600 hover:text-indigo-600 font-medium">New Arrivals</button>
          <button className="text-gray-400 cursor-not-allowed font-medium">AI Studio (Soon)</button>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Hi, {user.name}</span>
              <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onViewChange('login')}
              className="text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-full transition-colors"
            >
              Log In
            </button>
          )}
          
          <button 
            onClick={onCartOpen}
            className="p-2 text-gray-600 hover:text-indigo-600 relative transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const LoginView = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate Login
    onLogin({ name: name || email.split('@')[0], email });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{isSignUp ? 'Join the Club' : 'Welcome Back'}</h2>
          <p className="text-indigo-100">Access exclusive drops and track your orders.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input required type="text" value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input required type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          <div className="text-center mt-4">
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductDetails = ({ product, onAdd, onBack }) => {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={onBack} className="mb-8 text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-2 transition-colors">
        ← Back to Shop
      </button>
      
      <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-start">
        {/* Image Gallery */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-[4/5]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide">
            {product.category}
          </div>
        </div>

        {/* Info */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-3xl font-bold text-indigo-600">₹{product.price}</p>
            <p className="text-xl text-gray-400 line-through">₹{product.originalPrice}</p>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-3 text-sm font-bold rounded-lg border transition-all ${
                      size === s 
                      ? 'border-indigo-600 bg-indigo-600 text-white ring-2 ring-offset-2 ring-indigo-600' 
                      : 'border-gray-200 text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Select Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center focus:outline-none ${
                      color === c ? 'border-indigo-600 ring-2 ring-offset-1 ring-indigo-600' : 'border-transparent'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: c.toLowerCase() === 'navy blue' ? '#000080' : c.toLowerCase() }}></div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onAdd(product, size, color)}
              className="w-full bg-gray-900 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-lg font-bold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Add to Cart - ₹{product.price}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <Truck className="text-indigo-600" />
              <span>Free Shipping on Prepaid</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <ShieldCheck className="text-indigo-600" />
              <span>100% Cotton Guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <Package className="text-indigo-600" />
              <span>Dispatched in 24 Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- MAIN APPLICATION --- */

export default function App() {
  const [view, setView] = useState('home'); // home, login, product, checkout, success
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Checkout State
  const [loading, setLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', pincode: '', state: ''
  });

  // Actions
  const handleLogin = (userData) => {
    setUser(userData);
    setView('home');
  };

  const addToCart = (product, size, color) => {
    const newItem = { ...product, size, color, quantity: 1, cartId: Date.now() };
    setCart([...cart, newItem]);
    setIsCartOpen(true);
    setView('home');
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare Data for API
    const orderPayload = {
      customerData: checkoutData,
      items: cart,
      userId: user?.email || 'guest'
    };

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      
      const data = await response.json();
      console.log("Order Success:", data);
      setCart([]);
      setView('success');
    } catch (err) {
      alert("Order failed! Check console.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar 
        cartCount={cart.length} 
        user={user} 
        onViewChange={setView} 
        onLogout={() => setUser(null)}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <main>
        {/* HOME PAGE */}
        {view === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gray-900 text-white mb-12 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-90"></div>
              <img src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" alt="Hero" />
              <div className="relative z-10 p-12 sm:p-20 flex flex-col items-start justify-center min-h-[400px]">
                <span className="inline-block py-1 px-3 rounded-full bg-indigo-500 bg-opacity-30 border border-indigo-400 text-indigo-100 text-sm font-bold mb-6 backdrop-blur-sm">
                  NEW COLLECTION 2025
                </span>
                <h2 className="text-5xl sm:text-7xl font-black tracking-tighter mb-6 leading-tight">
                  Wear Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Passion.</span>
                </h2>
                <p className="text-lg text-gray-300 max-w-xl mb-8">
                  Premium streetwear designed for creators, developers, and dreamers. 
                  High-density prints on 100% bio-washed cotton.
                </p>
                <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2">
                  Shop Now <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-bold">Trending Drops</h3>
               <button className="text-indigo-600 font-bold hover:underline">View All</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => { setSelectedProduct(product); setView('product'); }}>
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                       <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 font-bold py-3 rounded-xl shadow-lg hover:bg-white">
                         Quick View
                       </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wider">{product.category}</p>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl">₹{product.price}</span>
                      <span className="text-gray-400 text-sm line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTHER VIEWS */}
        {view === 'login' && <LoginView onLogin={handleLogin} />}
        {view === 'product' && selectedProduct && <ProductDetails product={selectedProduct} onAdd={addToCart} onBack={() => setView('home')} />}
        
        {/* CHECKOUT VIEW */}
        {view === 'checkout' && (
          <div className="max-w-2xl mx-auto px-4 py-12">
            <button onClick={() => setView('home')} className="mb-6 text-gray-500 hover:text-indigo-600">← Keep Shopping</button>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Secure Checkout</h2>
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                    <input required className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" value={checkoutData.fullName} onChange={e => setCheckoutData({...checkoutData, fullName: e.target.value})} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                    <input required type="email" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" value={checkoutData.email} onChange={e => setCheckoutData({...checkoutData, email: e.target.value})} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                    <input required type="tel" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" value={checkoutData.phone} onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
                    <textarea required className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" rows="3" value={checkoutData.address} onChange={e => setCheckoutData({...checkoutData, address: e.target.value})}></textarea>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                  {cart.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm mb-2">
                      <span>{item.name} (x{item.quantity})</span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{cart.reduce((t, i) => t + i.price * i.quantity, 0)}</span>
                  </div>
                </div>

                <button disabled={loading} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg disabled:opacity-50">
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SUCCESS VIEW */}
        {view === 'success' && (
           <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
               <CheckCircle size={40} className="text-green-600" />
             </div>
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
             <p className="text-gray-500 max-w-md mb-8">Your order has been sent to our warehouse. You will receive a tracking link via SMS shortly.</p>
             <button onClick={() => setView('home')} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">Continue Shopping</button>
           </div>
        )}
      </main>

      {/* SLIDE-OVER CART */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform">
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex items-start justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900">Your Cart ({cart.length})</h2>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-gray-500"><X size={24} /></button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <ShoppingCart size={48} className="text-gray-200 mb-4" />
                    <p className="text-gray-500">Your cart is feeling light.</p>
                    <button onClick={() => setIsCartOpen(false)} className="mt-4 text-indigo-600 font-bold hover:underline">Start Shopping</button>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {cart.map((item) => (
                      <li key={item.cartId} className="flex py-2">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">₹{item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.color} | {item.size}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                            <button type="button" onClick={() => removeFromCart(item.cartId)} className="font-medium text-red-600 hover:text-red-500">Remove</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                  <button
                    onClick={() => { setIsCartOpen(false); setView('checkout'); }}
                    className="flex w-full items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}