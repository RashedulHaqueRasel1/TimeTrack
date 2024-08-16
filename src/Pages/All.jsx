import { useState, useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import "./Pagination.css"


const All = () => {

    const axiosPublic = useAxiosPublic();

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


    // Extract unique brand names and categories for filtering
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



    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by Category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

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
