function EditUser(props) {
    const { selectedUser, setSelectedUser, saveUser, setUserId, setIsEditModalOpen } = props;
    return (
        <div id="editModal" className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Edit User</h2>
                    <p className="text-sm text-gray-500 mb-4">Update user details:</p>
                </div>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            defaultValue={selectedUser.name} onChange={(event) => setSelectedUser({ ...selectedUser, name: event.target.value })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={selectedUser.email}
                            onChange={(event) => setSelectedUser({ ...selectedUser, email: event.target.value })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select id="role" name="role" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={selectedUser.role}
                            onChange={(event) => setSelectedUser({ ...selectedUser, role: event.target.value })}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select id="status" name="status" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={selectedUser.status}
                            onChange={(event) => setSelectedUser({ ...selectedUser, status: event.target.value })}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mr-2" onClick={saveUser}>Save</button>
                        <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400" onClick={() => { setUserId(''); setIsEditModalOpen(false) }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser;