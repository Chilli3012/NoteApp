import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false); // To toggle between view and edit modes
  const [updatedDetails, setUpdatedDetails] = useState({ fullName: '', email: '' });
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        setUpdatedDetails({ fullName: response.data.user.fullName, email: response.data.user.email });
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put('/update-profile', updatedDetails); // Update endpoint
      if (!response.data.error) {
        setUserInfo(response.data.user);
        setEditMode(false); // Exit edit mode
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Failed to update profile. Please try again later.');
      console.log(error);
    }
  };

  const handleDashboardClick=()=>{
    navigate('/dashboard');
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto mt-12">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-white via-gray-200 to-gray-400 shadow-xl rounded-2xl p-6 border border-gray-200">
            {userInfo && !editMode ? (
              <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">My Profile</h2>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-semibold">
                  {userInfo.fullName.charAt(0).toUpperCase()}
                </div>
                <p className="text-lg font-semibold text-gray-700">{userInfo.fullName}</p>
                <p className="text-gray-500">{userInfo.email}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600"
                    onClick={handleDashboardClick}
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-700">Edit Profile</h2>
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={updatedDetails.fullName}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={updatedDetails.email}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
