import React, { useState, useEffect, useRef } from 'react';
import { NgoCategories } from '../../content/data';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import ngoDatabaseServices from '../../databaseService/ngo.database.service';
// Mock NgoCategories data (replace with your actual import from '../../content/data')


const FilterNgo = ({ setShowFilter }) => {
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [certified, setCertified] = useState('all');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const { NgoByFilter, setNgoByFilter, setError } = useAuth();

    const categoryDropdownRef = useRef(null);
    const certifiedDropdownRef = useRef(null);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isCertifiedDropdownOpen, setIsCertifiedDropdownOpen] = useState(false);

    useEffect(() => {
        // Use the mockNgoCategories for demonstration
        setAvailableCategories(NgoCategories.sort());
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setIsCategoryDropdownOpen(false);
            }
            if (certifiedDropdownRef.current && !certifiedDropdownRef.current.contains(event.target)) {
                setIsCertifiedDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'country') setCountry(value);
        else if (name === 'state') setState(value);
        else if (name === 'city') setCity(value);
    };

    const handleCertifiedChange = (e) => {
        setCertified(e.target.value);
        setIsCertifiedDropdownOpen(false);
    };

    const handleCategoryCheckboxChange = (e) => {
        const category = e.target.value;
        setSelectedCategories((prev) =>
            e.target.checked ? [...prev, category] : prev.filter((c) => c !== category)
        );
    };

    const handleRemoveCategory = (categoryToRemove) => {
        setSelectedCategories((prev) => prev.filter((c) => c !== categoryToRemove));
    };

    const handleFilter = async () => {
        setLoading(true);

        try {
            const params = {};

            // Send only if value is present
            if (country.trim()) params.country = country;
            if (state.trim()) params.state = state;
            if (city.trim()) params.city = city;

            // If "all" is selected, don't send 'certified' at all
            if (certified !== 'all') params.certified = certified;

            // Join categories with commas, like: ?cate~gory=health,education
            if (selectedCategories.length > 0) {
                params.category = selectedCategories.join(',');
            }

            // You can replace 'safeGet' with axios.get if you're not using the wrapper


            const response = await ngoDatabaseServices.filterNgo(params);
            if (response.success) {
                setNgoByFilter(response.data); // 🔄 Update context with filtered NGOs
                setError(""); // Clear any previous errors
                console.log("Filtered NGOs:", response.data);
            } else {
                setNgoByFilter([]); // Clear previous NGOs if filtering fails
                setError(response.message || "Failed to filter NGOs");
                console.error("Error filtering NGOs:", response.message);
            }

            // setNgoByFilter(ngos); // 🔄 Update context with filtered NGOs
        } catch (error) {
            console.error("Error fetching filtered NGOs:", error.response?.data?.message || error.message);
            // Optionally show a toast/modal for feedback
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
            setShowFilter(false); // Close filter after applying
        }
    };

    const getCertifiedDisplayText = (value) => {
        if (value === 'true') return 'certified';
        if (value === 'false') return 'not certified';
        return 'All';
    };



    return (
        <div className="">
            {/* <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-blue-800 to-purple-900 p-4 sm:p-8 font-inter text-gray-100"> */}

            {/* {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />} */}

            <div className="max-w-6xl mx-auto bg-white bg-opacity-95 rounded-xl shadow-lg p-6 sm:p-8 border border-indigo-200">

                {/* Filter Section */}
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {/* Country Input */}
                    <div className="flex flex-col">
                        <label htmlFor="country" className="text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={country}
                            onChange={handleChange}
                            placeholder="e.g., india"
                            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 shadow-sm text-gray-800"
                        />
                    </div>

                    {/* State Input */}
                    <div className="flex flex-col">
                        <label htmlFor="state" className="text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={state}
                            onChange={handleChange}
                            placeholder="e.g., mizoram"
                            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 shadow-sm text-gray-800"
                        />
                    </div>

                    {/* City Input */}
                    <div className="flex flex-col">
                        <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={city}
                            onChange={handleChange}
                            placeholder="e.g., imphal"
                           className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 shadow-sm text-gray-800"
                        />
                    </div>

                    {/* <div className='flex max-sm:flex-col max-sm:justify-center w-full gap-5 items-center'> */}
                        {/* Certified Status Dropdown */}
                        <div className="flex w-full flex-col relative" ref={certifiedDropdownRef}>
                            <label className="text-sm font-medium text-gray-700 mb-1">Certified Status</label>
                            <button
                                type="button"
                                className="flex justify-between capitalize items-center w-full p-3 border-2 border-gray-300 rounded-md bg-white text-gray-700 hover:border-indigo-500 focus:outline-none shadow-sm"
                                onClick={() => setIsCertifiedDropdownOpen(!isCertifiedDropdownOpen)}
                            >
                                {getCertifiedDisplayText(certified)}
                                <svg
                                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${isCertifiedDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>

                            {isCertifiedDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 origin-top animate-dropdown-panel-enter">
                                    <div className="p-3 flex flex-col gap-2">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                id="certified-all"
                                                name="certified-status"
                                                value="all"
                                                checked={certified === 'all'}
                                                onChange={handleCertifiedChange}
                                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-700">All</span>
                                        </label>

                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                id="certified-yes"
                                                name="certified-status"
                                                value="true"
                                                checked={certified === 'true'}
                                                onChange={handleCertifiedChange}
                                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-700">Certified</span>
                                            <i className="fi fi-sr-shield-trust text-green-600 text-lg" /> {/* Certified Icon */}
                                        </label>

                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                id="certified-no"
                                                name="certified-status"
                                                value="false"
                                                checked={certified === 'false'}
                                                onChange={handleCertifiedChange}
                                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-700">Not Certified</span>
                                            <i className="fi fi-ss-shield-xmark absolute left-32 text-red-600 text-lg" /> {/* Not Certified Icon */}
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Category Dropdown with Checkboxes */}
                        <div className="md:col-span-2 w-full lg:col-span-2 flex flex-col relative" ref={categoryDropdownRef}>
                            <label className="text-sm font-medium text-gray-700 mb-1">Select Categories</label>
                            <button
                                type="button"
                                className="flex justify-between items-center w-full p-3 border-2 border-gray-300 rounded-md bg-white text-gray-700 hover:border-indigo-500 focus:outline-none shadow-sm"
                                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                            >
                                {selectedCategories.length === 0
                                    ? 'Select categories...'
                                    : selectedCategories.length === 1
                                        ? selectedCategories[0].charAt(0).toUpperCase() + selectedCategories[0].slice(1)
                                        : `${selectedCategories.length} categories selected`}
                                <svg
                                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>

                            {isCategoryDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2  border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto origin-top animate-dropdown-panel-enter">
                                    <div className="p-3">
                                        {availableCategories.length === 0 ? (
                                            <p className="text-gray-500 text-sm">No categories available.</p>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {availableCategories.map((cat) => (
                                                    <div key={cat} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`cat-dropdown-${cat}`}
                                                            value={cat}
                                                            checked={selectedCategories.includes(cat)}
                                                            onChange={handleCategoryCheckboxChange}
                                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor={`cat-dropdown-${cat}`} className="ml-2 text-sm text-gray-700 capitalize">
                                                            {cat}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Display selected categories as tags */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedCategories.map((cat, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                                    >
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCategory(cat)}
                                            className="ml-2 -mr-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-600 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    {/* </div> */}

                    {/* Filter Button */}
                    <div className="lg:col-span-3 flex justify-center mt-4">
                        <button
                            onClick={handleFilter}
                            disabled={loading}
                            className="w-full sm:w-auto px-8 py-3 bg-white text-indigo-700 text-sm border-2 border-indigo-600 font-semibold rounded-lg hover:bg-indigo-50"
                        >
                            {loading ? 'Filtering...' : 'Apply Filters'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterNgo;
