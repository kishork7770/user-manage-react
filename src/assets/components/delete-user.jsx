function DeleteUser(props) {
    const {deleteUser,setUserId,setIsDeleteModalOpen}=props;
    return(
        <div id="deleteModal" className="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                        <div className="p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Item</h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Are you sure you want to delete this item? This action cannot be undone.</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700" onClick={deleteUser} >Delete</button>
                            <button type="button" className="mt-3 bg-white text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3" onClick={() => { setUserId(''); setIsDeleteModalOpen(false) }}>Cancel</button>
                        </div>
                    </div>
                </div>
    )
}
export default DeleteUser;