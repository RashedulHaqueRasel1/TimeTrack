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
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });


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
        watch.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                <input type="text" placeholder="Search product name..."
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
                                <img src={watch.photo} alt={watch.categoryName} className="w-96 h-72 object-cover" />
                                <div className="absolute top-0 right-0">
                                    <div className="w-32 h-8 absolute top-4 -right-8">
                                        <div
                                            className="h-full w-full bg-indigo-600 text-white text-center leading-8 font-semibold transform rotate-45">
                                            {watch.brandName}</div>
                                    </div>
                                </div>
                                <div
                                    className="absolute bottom-2 left-0  px-2 py-0 text-white text-sm  ">
                                    {watch.stock === 'in stock' ? <><h1 className="bg-green-500 text-black font-medium px-4 py-2 rounded-full">{watch.stock}</h1></> : <><h1 className="bg-red-500 text-black font-medium px-4 py-2 rounded-full">{watch.stock}</h1></>}
                                </div>
                            </div>
                            <div className="space-x-1 flex justify-center mt-4">
                                <h1 className="px-2 text-sm font-bold">
                                    <Rating
                                        style={{ maxWidth: 100 }}
                                        value={watch.ratings}
                                        readOnly
                                    />
                                </h1>
                            </div>

                            <h1 className="font-bold mt-2 text-center text-2xl">{watch.name}</h1>
                            <h3 className=" text-xl mt-2">
                                <span className="opacity-90 font-medium">Price</span> : <span className="text-rose-500 font-medium">$ {watch.discountPrice} <span className="text-gray-500 line-through ml-2">$ {watch.price}</span></span>
                            </h3>
                            <h3 className="font-medium">
                                <span className="opacity-90">Category </span> : <span className="hover:text-rose-500">{watch.categoryName}</span>
                            </h3>

                            <div className="flex justify-between">
                                <div className=" font-medium">
                                    <p><span className=" font-medium opacity-90">Publish:</span> <span className=" text-black font-medium">{watch.creationDate}</span></p>
                                </div>
                                <div>
                                    {watch.creationTime}
                                </div>
                            </div>
                            <p className=""><span className="text-[18px] font-medium opacity-80 mt-2">Description</span> : <span className="opacity-80 text-black">{watch.shortDescription}</span></p>

                            <button className="p-2 px-6 mt-4 ml-24 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add To Cart</button>

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
