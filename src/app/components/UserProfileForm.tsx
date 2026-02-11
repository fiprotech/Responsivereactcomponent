import { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, X } from 'lucide-react';

export function UserProfileForm() {
  // Local state for form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    receiveNotifications: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      receiveNotifications: e.target.checked,
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      bio: '',
      receiveNotifications: false,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="text-3xl mb-2">User Profile</h1>
          <p className="text-gray-600">
            Update your personal information and preferences
          </p>
        </div>

        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">
              ✓ Profile updated successfully!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block mb-2 text-gray-700">
              <User className="inline-block w-4 h-4 mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-700">
              <Mail className="inline-block w-4 h-4 mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone - Grid layout on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block mb-2 text-gray-700">
                <Phone className="inline-block w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block mb-2 text-gray-700">
                <MapPin className="inline-block w-4 h-4 mr-2" />
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, State"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block mb-2 text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.bio.length} / 500 characters
            </p>
          </div>

          {/* Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="receiveNotifications"
              name="receiveNotifications"
              checked={formData.receiveNotifications}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="receiveNotifications"
              className="ml-2 text-gray-700"
            >
              Receive email notifications about updates
            </label>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Save className="w-5 h-5" />
              Save Profile
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              <X className="w-5 h-5" />
              Reset
            </button>
          </div>
        </form>

        {/* Display submitted data */}
        {isSubmitted && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl mb-4">Submitted Data:</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Name:</span>{' '}
                <span className="text-gray-900">{formData.fullName}</span>
              </p>
              <p>
                <span className="text-gray-600">Email:</span>{' '}
                <span className="text-gray-900">{formData.email}</span>
              </p>
              {formData.phone && (
                <p>
                  <span className="text-gray-600">Phone:</span>{' '}
                  <span className="text-gray-900">{formData.phone}</span>
                </p>
              )}
              {formData.address && (
                <p>
                  <span className="text-gray-600">Address:</span>{' '}
                  <span className="text-gray-900">{formData.address}</span>
                </p>
              )}
              {formData.bio && (
                <p>
                  <span className="text-gray-600">Bio:</span>{' '}
                  <span className="text-gray-900">{formData.bio}</span>
                </p>
              )}
              <p>
                <span className="text-gray-600">Notifications:</span>{' '}
                <span className="text-gray-900">
                  {formData.receiveNotifications ? 'Enabled' : 'Disabled'}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
