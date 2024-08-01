import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import {
	fetchProducts,
	selectAllProducts,
	selectProductsStatus,
	selectProductsError,
} from "../store/slices/productsSlice";
import Loading from "../components/Loading";

const Store: React.FC = () => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(selectAllProducts);
	const status = useAppSelector(selectProductsStatus);
	const error = useAppSelector(selectProductsError);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchProducts());
		}
	}, [status, dispatch]);

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(selectedCategory === "" || product.category === selectedCategory) &&
			product.isActive,
	);

	const categories = [...new Set(products.map((product) => product.category))];

	if (status === "loading") {
		return <Loading size="large" color="text-blue-500" />;
	}

	if (status === "failed") {
		return <div className="text-red-500">Error: {error}</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Our Store</h1>
			<div className="mb-4 flex space-x-4">
				<input
					type="text"
					placeholder="Search products..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<select
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="">All Categories</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{filteredProducts.map((product) => (
					<div key={product._id} className="border rounded-lg p-4 shadow-md">
						{product.imageUrls && product.imageUrls.length > 0 && (
							<img
								src={product.imageUrls[0]}
								alt={product.name}
								className="w-full h-48 object-cover rounded-md mb-4"
							/>
						)}
						<h2 className="text-xl font-semibold">{product.name}</h2>
						<p className="text-gray-600">${product.price.toFixed(2)}</p>
						<p className="text-sm text-gray-500 mt-2">{product.description}</p>
						<p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
						<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
							Add to Cart
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Store;
