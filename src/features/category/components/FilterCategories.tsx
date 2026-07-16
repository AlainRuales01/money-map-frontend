const FilterCategories = () => {
    return (
        <form>
            <div className="flex flex-row gap-4 align-center">
                <input type = "text" placeholder="Search categories..." className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"></input>
                <select className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80">
                    <option value="">All Categories</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Search</button>
            </div>
        </form>
    )
}

export default FilterCategories