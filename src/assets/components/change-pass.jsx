import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function ChangePasswordModal(props) {
    const { setIsChangePasswordModal, userId, selectedUser, setSelectedUser, fetchUsers, setIsOpenChangePasswordModal } = props;

    const [password, setPassword] = useState('');

    const saveUser = async () => {
        console.log(userId);
        try {
            await axios.put('http://localhost:4000/users/' + userId, { ...selectedUser, password });
            setIsOpenChangePasswordModal(false);
            setSelectedUser({});
            setPassword('');
            toast.success("Password Changed Successfully");
            fetchUsers();
        } catch (error) {
            console.log(error);
            toast.error("failed to change the password");
        }
    };
    const cancel = () => {
        setIsOpenChangePasswordModal(false);
    }
    return (
        <div id="editModal" className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Edit User</h2>
                    <p className="text-sm text-gray-500 mb-4">Update user details:</p>
                </div>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="text" id="name" name="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mr-2" onClick={saveUser}>Save</button>
                        <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400" onClick={cancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ChangePasswordModal;