import { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard";
import DestinationModal from "../components/DestinationModal";

export default function Destinations() {
    const [places, setPlaces] = useState([]);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [priceFilter, setPriceFilter] = useState("");

    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => setPlaces(data.places))
            .catch((err) => console.error("Failed to load data.json", err));
    }, []);

    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.location_name.toLowerCase().includes(search.toLowerCase());

        const priceLevels = ["$", "$$", "$$$", "$$$$", "$$$$$"];
        const selectedIndex = priceFilter ? priceLevels.indexOf(priceFilter) : -1;
        const matchesPrice = selectedIndex === -1 || priceLevels.indexOf(place.price.replace("Price: ", "").trim()) <= selectedIndex;

        return matchesSearch && matchesPrice;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mt-3 mb-8">Explore Destinations</h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                    <input
                        type="text"
                        placeholder="Search destinations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    />
                    <select
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">All Prices</option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                        <option value="$$$$">$$$$</option>
                        <option value="$$$$$">$$$$$</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-15">
                    {filteredPlaces.map((place, index) => (
                        <DestinationCard key={index} destination={place} index={index} onClick={() => setSelected(place)} />
                    ))}
                </div>
            </div>

            {selected && <DestinationModal destination={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}
