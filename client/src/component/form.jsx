import { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const EventRegistrationForm = () => {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: '',
    });


    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
    });
};

    const validateForm = () => {
    let errors = {};

    if (!formData.name) {
        errors.name = 'Name is required';
    }

    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
    }

    if (!formData.age) {
        errors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
        errors.age = 'Age must be a number greater than 0';
    }

    if (formData.attendingWithGuest && !formData.guestName) {
        errors.guestName = 'Guest Name is required if attending with a guest';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
};

    const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        setFormSubmitted(true);
    }
};




    return (
        <div className='bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-950 h-screen pt-8 ' >
            <h1 className='text-center font-extrabold font-serif italic text-emerald-950 text-4xl'>
                    Basic Dynamic Form
                </h1>
            <div className=" max-w-md mx-auto mt-4 p-8 shadow-2xl rounded-lg bg-white">
        {!formSubmitted ? (
        <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <input
        type="text"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="pl-10 pr-4 py-2 shadow-md shadow-gray-500/75 rounded w-full focus:outline-none focus:border-blue-500"
        />
            {formErrors.name && (
                <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
        </div>

        <div className="relative mb-4">
        <MdOutlineEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="pl-10 pr-4 py-2 shadow-md shadow-gray-500/75 rounded w-full focus:outline-none focus:border-blue-500"
        />
            {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
            </div>

            <div className="mb-4">
            <input
                type="number"
                placeholder='Age'
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 p-2 shadow-md shadow-gray-500/75 rounded w-full"
            />
            {formErrors.age && (
                <p className="text-red-500 text-sm">{formErrors.age}</p>
            )}
            </div>

            <div className="mb-4">
            <label className=" text-gray-700 font-serif">Are you attending with a guest?</label>
            <input
                type="checkbox"
                name="attendingWithGuest"
                checked={formData.attendingWithGuest}
                onChange={handleChange}
                className="ml-3 size-4"
            />
            </div>

            {formData.attendingWithGuest && (
                <div className="relative mb-4">
                <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <input
            type="text"
            placeholder="Name of Guest"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 shadow-md shadow-gray-500/75 rounded w-full focus:outline-none focus:border-blue-500"
            />
                {formErrors.guestName && (
                <p className="text-red-500 text-sm">{formErrors.guestName}</p>
                )}
            </div>
        )}

        <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
        >
            Submit
        </button>
        </form>
    ) : (
        <div>
            <h2 className="text-xl mb-4 font-serif italic text-center font-bold">Form Submission Summary</h2>
            <p className='font-serif'><strong>Name:</strong> {formData.name}</p>
            <p className='font-serif'><strong>Email:</strong> {formData.email}</p>
            <p className='font-serif'><strong>Age:</strong> {formData.age}</p>
            <p className='font-serif'><strong>Attending with Guest:</strong> {formData.attendingWithGuest ? 'Yes' : 'No'}</p>
            {formData.attendingWithGuest && (
            <p><strong>Guest Name:</strong> {formData.guestName}</p>
        )}
        </div>
        )}
    </div>
        </div>
    
);
};

export default EventRegistrationForm;
