import { useState, useEffect, useContext } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import "./Pagination.css"
import { AuthContext } from "../Auth/Provider/AuthProvider";
import { IoSearch } from "react-icons/io5";


const All = () => {

    const axiosPublic = useAxiosPublic();
    const { loading } = useContext(AuthContext);

    const [watches, setWatches] = useState([]);
    const [sortOrder, setSortOrder] = useState("lowToHigh");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });


    useEffect(() => {
        const fetchWatches = async () => {
            try {
                const response = await axiosPublic.get("/watches", {
                    params: {
                        sort: sortOrder,
                        brandName: selectedBrand,
                        categoryName: selectedCategory,
                        minPrice: priceRange.min,
                        maxPrice: priceRange.max,
                        page: currentPage,
                        limit: itemsPerPage,
                    },
                });
                console.log(response.data.total)
                setWatches(response.data.watches);
                setTotalItems(response.data.total);
            } catch (error) {
                console.error("Error fetching watches:", error);
            }
        };

        fetchWatches();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOrder, currentPage, selectedBrand, selectedCategory, priceRange]);


    // brandName and categoryName for filtering
    const uniqueBrands = [...new Set(watches.map((watch) => watch.brandName))];
    const uniqueCategories = [...new Set(watches.map((watch) => watch.categoryName))];



    // Searching For categoryName
    const [searchTerm, setSearchTerm] = useState('');
    const filteredWatches = watches.filter((watch) =>
        watch.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );



    // Pagination
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i)
    }


    // Loading 
    if (loading) return <div className="flex gap-4  p-4 flex-wrap justify-center">
        <img className="w-48 h-48 animate-spin mt-96  lg:mt-32 lg:mb-32" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon"></img>
    </div>;


    return (
        <div>
            <div>

                {/* Search Input */}
                <div className="flex relative justify-center lg:ml-96 rounded-md w-full px-4 max-w-xl mt-20 lg:mt-0">
                    <input type="text" placeholder="Search watch name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 rounded-md  border-blue-300   input-bordered border  placeholder-gray-500 dark:placeholder-gray-500 dark:border-indigo-600 dark:text-black   " />
                    <button
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white text-lg font-semibold   px-3 rounded-r-md">
                        <span>search</span>
                        <span className="hidden md:block">
                            <IoSearch />
                        </span>
                    </button>
                </div>
            </div>


            {/* Sort Dropdown */}
            <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="latestAdded">Latest Added</option>
            </select>

            {/* Filter by Brand Name */}
            <select onChange={(e) => setSelectedBrand(e.target.value)} value={selectedBrand}>
                <option value="">All Brands</option>
                {uniqueBrands.map((brand, index) => (
                    <option key={index} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>

            {/* Filter by Category Name */}
            <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                <option value="">All Categories</option>
                {uniqueCategories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {/* Filter by Price Range */}
            <input
                type="number"
                placeholder="Min Price"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            />
            <input
                type="number"
                placeholder="Max Price"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            />

            {/* Displaying Watches */}
            <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16 p-4">
                {filteredWatches.map((watch, index) => (
                    <li key={index}>
                        <img src={watch.img} alt={watch.categoryName} width="100" />
                        <h3>
                            {watch.brandName} - {watch.categoryName}
                        </h3>
                        <p>{watch.shortDescription}</p>
                        <p>Price: ${watch.price}</p>
                        <p>Date: {watch.creationDate}</p>
                        <p>Time: {watch.creationTime}</p>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className='pagination mb-1'>
                <span onClick={() => setCurrentPage(currentPage - 1)} className="cursor-pointer font-bold border border-blue-400 p-1" >Previous	&lt;	&lt;</span>

                {
                    pages.map((page, index) => {
                        return <button
                            className={page == currentPage ? 'active' : ''}
                            key={index}
                            onClick={() => setCurrentPage(page)}>{page}</button>
                    })
                }

                <span onClick={() => setCurrentPage(currentPage + 1)} className="cursor-pointer font-bold border border-blue-400 p-1">Next &gt;&gt;</span>


            </div>
        </div>
    );
};

export default All;
