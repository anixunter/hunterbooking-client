import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { format } from "date-fns";
import "./Booking.css";
import { AuthContext } from "../../context/authContext";

const Booking = () => {
  const location = useLocation();
  const hotelId = location.state.hotelId;
  const selectedRoomIDs = location.state.selectedRoomsIDs;
  const selectedRoomNumbers = location.state.selectedRoomNumbers;
  const selectedDates = location.state.alldates;

  const { user } = useContext(AuthContext);

  const formattedDates = selectedDates.map((timestamp) =>
    format(new Date(timestamp), "MMMM/dd/yyyy")
  );

  const [roomData, setRoomData] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getSelectedRoomsData = async () => {
      try {
        const selectedRoomsData = await Promise.all(
          selectedRoomIDs.map(async (roomId) => {
            const res = await axios.get(`${API_URL}/rooms/${roomId}`);
            return res.data;
          })
        );
        setRoomData(selectedRoomsData);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectedRoomsData();
  }, []);

  const { data: hotelData } = useFetch(`${API_URL}/hotels/find/${hotelId}`);
  return (
    <>
      <Navbar />
      <div className="booking">
        <div className="booking-container">
          <h1>Booking Details</h1>
          <div className="booking-userDetails">
            <h2>User Details</h2>
            <p>
              Username: <span id="booking-username">{user.username}</span>
            </p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
          <div className="booking-hotelDetails">
            <h2>Hotel Details</h2>
            <h4>
              Hotel:<span>{hotelData.name}</span>
            </h4>
            <div className="booking-roomDetails">
              <h4>Room:</h4>
              {roomData.map((room) => (
                <p key={room._id}>{room.title}</p>
              ))}
            </div>
            <div className="booking-roomNumbers">
              <h4>Room numbers:</h4>
              {selectedRoomNumbers.map((roomNumber) => (
                <p key={roomNumber}>{roomNumber}</p>
              ))}
            </div>
            <div className="booking-bookedDates">
              <h4>Booked dates:</h4>
              {formattedDates.map((date) => (
                <p key={date}>{date}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="booking-info">
          <p>Thank you for booking with us!</p>
        </div>
      </div>
    </>
  );
};

export default Booking;
