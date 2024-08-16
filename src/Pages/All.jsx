import { useState, useEffect, useContext } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import "./Pagination.css"
import { AuthContext } from "../Auth/Provider/AuthProvider";
import { IoSearch } from "react-icons/io5";
import '@smastrom/react-rating/style.css'
import { Rating } from "@smastrom/react-rating";



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


            {/*-------------- Search Input Start -----------*/}
            <div className="flex relative justify-center lg:ml-96 rounded-md w-full px-4 max-w-xl   lg:mt-0">
                <input type="text" placeholder="Search watch name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 rounded-md mt-32 lg:mt-4 border-blue-300   input-bordered border  placeholder-gray-500 dark:placeholder-gray-500 dark:border-indigo-600 dark:text-black   " />
                <button
                    className="inline-flex items-center mt-32 lg:mt-4 gap-2 bg-indigo-600 text-white text-lg font-semibold   px-3 rounded-r-md">
                    <span>search</span>
                    <span className="hidden md:block">
                        <IoSearch />
                    </span>
                </button>
            </div>
            {/*-------------- Search Input End -----------*/}



            {/*----------  Sort Price Start---------- */}
            <div className="flex relative justify-center lg:ml-96 rounded-md w-full px-4 max-w-xl   lg:mt-0">
                <select
                    onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}
                    className="h-10 border-2 border-indigo-600 focus:outline-none focus:border-indigo-600 text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider mt-2">
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                    <option value="latestAdded">Latest Added</option>
                </select>
            </div>
            {/*----------  Sort Price End---------- */}


            {/* ---------- Filtering Start (Brand & Category) ---------- */}
            <div className="flex justify-center ml-2 mt-2 lg:ml-40">

                {/* --- Filter by Brand Name ---*/}
                <div className="  rounded-md w-full px-4 max-w-xl   lg:mt-0">

                    <select onChange={(e) => setSelectedBrand(e.target.value)} value={selectedBrand}
                        className="h-10 border-2 border-indigo-600 focus:outline-none focus:border-indigo-600 text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider ">
                        <option value="">All Brands</option>
                        {uniqueBrands.map((brand, index) => (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>

                </div>


                {/* --- Filter by Category Name --- */}
                <div className="  rounded-md w-full px-4 max-w-xl   lg:mt-0">

                    <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}
                        className="h-10 border-2 border-indigo-600 focus:outline-none focus:border-indigo-600 text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider  ">
                        <option value="">All Categories</option>
                        {uniqueCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                </div>

            </div>

            {/* ---------- Filtering End (Brand & Category) ---------- */}



            {/* ---------- Filter by Price Range Start----------*/}

            {/* --- Min Price --- */}
            <div className="flex justify-center ml-2 mt-2 lg:ml-40">
                <div className="rounded-md w-full px-4 max-w-xl   lg:mt-0">
                    <label className="label">
                        <span className="font-medium">Min Price :</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Min Price"
                        className="w-32  p-3 rounded-md   border-blue-300   input-bordered border  placeholder-gray-500 dark:placeholder-gray-500 dark:border-indigo-600 dark:text-black   "
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    />
                </div>

                {/* --- Max Price --- */}
                <div className="rounded-md w-full px-4 max-w-xl   lg:mt-0">
                    <label className="label">
                        <span className="font-medium">Max Price :</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Max Price"
                        className="w-40  p-3 rounded-md  border-blue-300   input-bordered border  placeholder-gray-500 dark:placeholder-gray-500 dark:border-indigo-600 dark:text-black   "
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    />
                </div>
            </div>
            {/* ---------- Filter by Price Range End----------*/}



            {/* Displaying Watches */}
            <div className="">
                <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16 p-4">
                    {filteredWatches.map((watch, index) => (
                        <li key={index} className="w-full max-w-sm overflow-hidden hover:bg-blue-300 bg-blue-200 border-2 border-blue-400 rounded-2xl p-6 shadow-lg  ">
                            {/* <img src={watch.img} alt={watch.categoryName} className="w-96 h-72 " /> */}
                            <div className="relative">
                                {/* <img className="w-full h-64 object-cover" src="https://picsum.photos/200/200" alt="Image"> */}
                                <img src={watch.img} alt={watch.categoryName} className="w-96 h-72 object-cover" />
                                <div className="absolute top-0 right-0">
                                    <div className="w-32 h-8 absolute top-4 -right-8">
                                        <div
                                            className="h-full w-full bg-indigo-600 text-white text-center leading-8 font-semibold transform rotate-45">
                                            {watch.brandName}</div>
                                    </div>
                                </div>
                            </div>

                            <h1 className="font-bold mt-2 text-center text-2xl">{watch.categoryName}</h1>
                            <h3 className="font-medium text-xl mt-1">
                                <span className="opacity-90">Price</span> : <span className="hover:text-rose-500">$ {watch.price}</span>
                            </h3>
                            <div className="flex justify-between">
                                <div>
                                    <p><span className="opacity-90">Publish:</span> <span className="opacity-80 text-black">{watch.creationDate}</span></p>
                                </div>
                                <div>
                                    <div className="flex items-center  text-gray-700 dark:text-gray-200">
                                        <h1 className="px-2 text-sm font-bold">
                                            <Rating
                                                style={{ maxWidth: 100 }}
                                                value={watch.ratings}
                                                readOnly
                                            />
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <p className=""><span className="text-[18px] font-medium opacity-80">Description</span> : <span className="opacity-80 text-black">{watch.shortDescription}</span></p>

                        </li>
                    ))}
                </ul>
            </div>


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
