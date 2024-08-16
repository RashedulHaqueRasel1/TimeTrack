import { Link } from "react-router-dom";

 

const Footer = () => {
    return (
        <div>

            <footer className="flex flex-col bg-[#1e3059] p-6 text-white space-y-10 justify-center  ">

                <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
                    <a className="text-white" href="/">Home</a>
                    <a className="text-white" href="#">About</a>
                    <a className="text-white" href="#">Services</a>
                    <a className="text-white" href="#">Media</a>
                    <a className="text-white" href="#">Gallery</a>
                    <a className="text-white" href="#">Contact</a>
                </nav>

                <div className="flex justify-center space-x-5">
                    <a href="https://github.com/RashedulHaqueRasel1" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/github.png" />
                    </a>
                    <a href="https://www.linkedin.com/in/rashedul-haque-rasel1" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
                    </a>
                    <a href="https://www.facebook.com/Rashedul.haque.Rase1" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
                    </a>
 
                </div>
                <p className="text-center text-white font-medium"> <Link to={'https://rashedul-haque-rasel.vercel.app'} className="underline text-indigo-500">Rashedul Haque Rasel</Link> &copy; {new Date().getFullYear()}  All rights reservered.</p>
            </footer>

        </div>
    );
};

export default Footer;