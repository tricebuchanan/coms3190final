import { Link } from "react-router-dom";

export default function DestinationCard({ destination, index, onClick }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col text-center">
            <img src={destination.image_url} alt={destination.location_name} className="h-48 w-full object-cover" />
            <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{destination.location_name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>
                </div>

                <p className="text-orange-600 font-semibold mt-auto">{destination.price}</p>

                <button onClick={onClick} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer">
                    VIEW DETAILS
                </button>
            </div>
        </div>
    );
}
