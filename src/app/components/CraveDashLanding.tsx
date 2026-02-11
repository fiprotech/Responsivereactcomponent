import { useState, useRef } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ChevronDown, UtensilsCrossed } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface CheckoutForm {
  fullName: string;
  mobileNumber: string;
  deliveryAddress: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Gourmet Burger',
    description: 'Juicy beef patty with premium toppings',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1761315413256-e149b40f577b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3MDc2ODM4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Mains'
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1667207394004-acb6aaf4790e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBwaXp6YSUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzcwNzAzMDcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Mains'
  },
  {
    id: 3,
    name: 'Sushi Platter',
    description: 'Fresh assorted sushi rolls and nigiri',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1763647756796-af9230245bf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN1c2hpJTIwcGxhdHRlcnxlbnwxfHx8fDE3NzA3NzU1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Mains'
  },
  {
    id: 4,
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon and parmesan',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1707322540604-f69bd7b2cb4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYSUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzA3NTc1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Mains'
  },
  {
    id: 5,
    name: 'Grilled Chicken Bowl',
    description: 'Healthy bowl with grilled chicken and veggies',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1685079230208-dcced9f55eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NzA3OTE2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Healthy'
  },
  {
    id: 6,
    name: 'Tacos Supreme',
    description: 'Three authentic Mexican tacos',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1707604341704-74abdc25e52a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW4lMjBmb29kfGVufDF8fHx8MTc3MDcwMDIzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Mains'
  },
  {
    id: 7,
    name: 'Ramen Bowl',
    description: 'Traditional Japanese ramen with pork',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1627900440398-5db32dba8db1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMG5vb2RsZSUyMGJvd2wlMjBhc2lhbnxlbnwxfHx8fDE3NzA3OTE2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Mains'
  },
  {
    id: 8,
    name: 'Chocolate Lava Cake',
    description: 'Decadent chocolate dessert',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NzA3OTEzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Desserts'
  },
  {
    id: 9,
    name: 'Açai Smoothie Bowl',
    description: 'Healthy bowl with fresh berries and granola',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1642339800099-921df1a0a958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGJvd2wlMjBoZWFsdGh5JTIwYnJlYWtmYXN0fGVufDF8fHx8MTc3MDcyODM3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Healthy'
  },
];

export function CraveDashLanding() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    fullName: '',
    mobileNumber: '',
    deliveryAddress: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<CheckoutForm>>({});

  const menuRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCheckout = () => {
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const validateForm = () => {
    const errors: Partial<CheckoutForm> = {};

    if (!checkoutForm.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!checkoutForm.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(checkoutForm.mobileNumber)) {
      errors.mobileNumber = 'Please enter a valid mobile number';
    }

    if (!checkoutForm.deliveryAddress.trim()) {
      errors.deliveryAddress = 'Delivery address is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCheckoutForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof CheckoutForm]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof CheckoutForm];
        return newErrors;
      });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to your cart before placing an order.');
      return;
    }
    if (validateForm()) {
      setOrderPlaced(true);
      console.log('Order placed:', { cart, checkoutForm, total: getTotalPrice() });
      setTimeout(() => {
        setCart([]);
        setCheckoutForm({ fullName: '', mobileNumber: '', deliveryAddress: '' });
        setOrderPlaced(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full mb-6">
                <UtensilsCrossed className="w-4 h-4" />
                <span className="text-sm font-medium">Fast Delivery in 30 Minutes</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Crave It.<br />
                <span className="text-orange-600">Dash It.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Premium meals delivered fresh to your door. From gourmet burgers to healthy bowls, 
                satisfy every craving with CraveDash.
              </p>
              <button
                onClick={scrollToMenu}
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="text-lg font-semibold">View Menu</span>
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Hero Image */}
            <div className="flex-1 relative">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-3xl opacity-20"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761315413256-e149b40f577b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3MDc2ODM4OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Featured Food"
                  className="relative rounded-3xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section ref={menuRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Select Your Meal</h2>
            <p className="text-xl text-gray-600">Handcrafted with love, delivered with speed</p>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                    <span className="text-sm font-semibold text-gray-700">{item.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="font-medium">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Summary - Fixed at bottom on mobile, sticky on desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:sticky lg:top-4 lg:bottom-auto lg:max-w-7xl lg:mx-auto lg:px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-t lg:border lg:rounded-2xl shadow-2xl">
          <button
            onClick={() => setShowCart(!showCart)}
            className="w-full px-6 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <span className="font-semibold text-gray-900">Your Cart</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-orange-600">
                ${getTotalPrice().toFixed(2)}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  showCart ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>

          {/* Cart Items Dropdown */}
          {showCart && (
            <div className="px-6 pb-6 border-t border-gray-100 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mt-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-100">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-orange-600 font-bold">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={scrollToCheckout}
                    className="w-full mt-6 px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors font-semibold shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Checkout Section */}
      <section ref={checkoutRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl shadow-xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Order</h2>
              <p className="text-gray-600">Just a few details and you're done!</p>
            </div>

            {orderPlaced && (
              <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Order Placed Successfully!</h3>
                  <p className="text-green-700">Your delicious meal is on its way. ETA: 30 minutes</p>
                </div>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block mb-2 text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={checkoutForm.fullName}
                  onChange={handleFormChange}
                  className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    formErrors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                  placeholder="John Doe"
                />
                {formErrors.fullName && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.fullName}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobileNumber" className="block mb-2 text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={checkoutForm.mobileNumber}
                  onChange={handleFormChange}
                  className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    formErrors.mobileNumber ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {formErrors.mobileNumber && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.mobileNumber}</p>
                )}
              </div>

              {/* Delivery Address */}
              <div>
                <label htmlFor="deliveryAddress" className="block mb-2 text-gray-700">
                  Delivery Address
                </label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={checkoutForm.deliveryAddress}
                  onChange={handleFormChange}
                  rows={3}
                  className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none ${
                    formErrors.deliveryAddress ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                  placeholder="123 Main Street, Apt 4B, New York, NY 10001"
                />
                {formErrors.deliveryAddress && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.deliveryAddress}</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-6 border-2 border-orange-100">
                <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>$2.99</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-900">Total</span>
                      <span className="text-orange-600">${(getTotalPrice() + 2.99).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cart.length === 0}
              >
                {cart.length === 0 ? 'Add Items to Cart' : 'Place Order'}
              </button>

              {cart.length === 0 && (
                <p className="text-center text-gray-500 text-sm">
                  Please add items to your cart before placing an order
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <UtensilsCrossed className="w-8 h-8 text-orange-500" />
            <h3 className="text-3xl font-bold">CraveDash</h3>
          </div>
          <p className="text-gray-400 mb-6">Delivering happiness, one meal at a time</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-orange-500 transition-colors">About Us</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
          </div>
          <p className="text-gray-500 text-sm mt-8">© 2026 CraveDash. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
