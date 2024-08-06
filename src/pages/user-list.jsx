
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import EditUser from '../assets/components/edit-user';
import DeleteUser from '../assets/components/delete-user';
import ChangePasswordModal from '../assets/components/change-pass';
function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [role, setRole] = useState([]);
    const [userId, setUserId] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [searchRole, setSearchRole] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    useEffect(() => {

        if (localStorage.getItem('user')) {

            fetchUsers();
        }
    }, []);
    const fetchUsers = async () => {
        try {
            const { role } = JSON.parse(localStorage.getItem('user'));
            setRole(role);
            const { data } = await axios.get('http://localhost:4000/users');
            if (role === 'admin') {
                setUsers(data);
                setFilteredUsers(data);
            } else {
                setUsers([JSON.parse(localStorage.getItem('user'))]);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const openDeleteModal = (userId) => {
        setIsDeleteModalOpen(true);
        setUserId(userId);
    }
    const deleteUser = async () => {
        try {
            await axios.delete('http://localhost:4000/users/' + userId);
            setIsDeleteModalOpen(false);
            setUserId('');
            toast.success("User Deleted Successfully");
            fetchUsers();
        } catch (error) {
            console.log(error);
            toast.error("failed to delete");
        }
    };

    const openEditModal = (userId) => {
        setUserId(userId);
        setIsEditModalOpen(true);
        setSelectedUser(filteredUsers.find(user => user.id === userId));
    };

    const saveUser = async () => {
        try {
            await axios.put('http://localhost:4000/users/' + userId, selectedUser);
            setIsEditModalOpen(false);
            setUserId('');
            setSelectedUser({});
            toast.success("User Deleted Successfully");
            fetchUsers();
        } catch (error) {
            console.log(error);
            toast.error("failed to Update");
        }
    };
    const OpenChangePasswordModal = (userId) => {
        setIsOpenChangePasswordModal(true);
        setUserId(userId);
        setSelectedUser(filteredUsers.find(user => user.id === userId));
    };
    const searchUsers = async () => {
        console.log(searchString);
        console.log(searchRole);
        try {
            const _filteredUsers = users.filter(user => (user.name.toLowerCase().includes(searchString.toLocaleLowerCase()) || user.email.toLowerCase().includes(searchString.toLocaleLowerCase())));
            setFilteredUsers(_filteredUsers);


        } catch (error) {
            console.error(error);
        }
    };

    const onChangeRoleOrStatus = async (field, value) => {
        try {
            let queryParams = '';
            if (value !== '') {
                queryParams += `?${field}=${value}`;
            }
            const { data } = await axios.get('http://localhost:4000/users/' + queryParams);
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            toast.error("error");
        }
    }
    return (
        <div className="main w-full">
            <div className='userHeading'>
                <h2 className="text-2xl font-bold mb-4 text-center">Users</h2>
            </div>
            <div className="flex items-center justify-end pb-4">
                <div className="flex space-x-4 w-2/5">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search..." onChange={(event) => setSearchString(event.target.value)}
                        />
                        <svg
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={searchUsers}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35M18.5 10.5a8 8 0 11-16 0 8 8 0 0116 0z"
                            ></path>
                        </svg>
                    </div>
                    <select className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={(event) => onChangeRoleOrStatus('role', event.target.value)}>
                        <option value="">Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <select className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={(event) => onChangeRoleOrStatus('status', event.target.value)} >
                        <option value="">Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            <Fragment>
                                {filteredUsers.map(user => (
                                    <tr className="border-b " key={user.id}>
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">j{user.email}</td>
                                        <td className="px-4 py-2">{user.role}</td>

                                        <td className="px-4 py-2">{user.status}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex justify-start space-x-2">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" title='Edit' onClick={() => openEditModal(user.id)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                {role === 'admin' && <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded" title='Change password' onClick={() => OpenChangePasswordModal(user.id)}>
                                                    <i className="fa-solid fa-key"></i>
                                                </button>}
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" title='Delete' onClick={() => openDeleteModal(user.id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </Fragment>
                        ) : (
                            <tr>
                                <td colSpan="5" className='text=center'>No Users Found!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isDeleteModalOpen && (
                <DeleteUser deleteUser={deleteUser} setUserId={setUserId} setIsDeleteModalOpen={setIsDeleteModalOpen} />
            )}
            {isOpenChangePasswordModal && (
                <ChangePasswordModal
                    userId={userId}
                    setIsOpenChangePasswordModal={setIsOpenChangePasswordModal}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    fetchUsers={fetchUsers}
                />
            )}
            {isEditModalOpen && (
                <EditUser selectedUser={selectedUser} saveUser={saveUser} setUserId={setUserId} setSelectedUser={setSelectedUser} setIsEditModalOpen={setIsEditModalOpen} />
            )}
        </div>
    )
}

export default UserList;