import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./Reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRoomsIDs, setSelectedRoomsIDs] = useState([]); //contains room Ids
  const [selectedRoomNumbersIDs, setSelectedRoomNumbersIDs] = useState([]);
  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState([]); //contains room numbers

  const API_URL = import.meta.env.VITE_API_URL;
  const { data } = useFetch(`${API_URL}/hotels/room/${hotelId}`); //gets rooms array from a hotel

  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const name = e.target.name;
    // Create a new array to hold selected room numbers and room numbersIds
    let updatedSelectedRoomNumbersIDs;
    let updatedSelectedRoomNumbers;
    if (checked) {
      // If checkbox is checked, add room numbers and room numbersIds to the array
      updatedSelectedRoomNumbersIDs = [...selectedRoomNumbersIDs, value];
      updatedSelectedRoomNumbers = [...selectedRoomNumbers, name];
    } else {
      // If checkbox is unchecked, remove room numbers and room numbesIds from the array
      updatedSelectedRoomNumbersIDs = selectedRoomNumbersIDs.filter(
        (item) => item !== value
      );
      updatedSelectedRoomNumbers = selectedRoomNumbers.filter(
        (item) => item !== name
      );
    }
    setSelectedRoomNumbersIDs(updatedSelectedRoomNumbersIDs);
    setSelectedRoomNumbers(updatedSelectedRoomNumbers);
    // Find the roomIds associated with the selected room numbersIds
    const roomIds = data.reduce((acc, item) => {
      item.roomNumbers.forEach((roomNumber) => {
        if (updatedSelectedRoomNumbersIDs.includes(roomNumber._id)) {
          acc.add(item._id); // Add roomId to the Set
        }
      });
      return acc;
    }, new Set());
    // Convert Set of room numbersIds to array
    const selectedRoomIds = [...roomIds];
    // Save room numbersIds to state
    setSelectedRoomsIDs(selectedRoomIds);
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRoomNumbersIDs.map((roomNumberId) => {
          const res = axios.put(
            `${API_URL}/rooms/availability/${roomNumberId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/booking", {
        state: {
          hotelId,
          selectedRoomsIDs,
          selectedRoomNumbers,
          alldates,
        },
      });
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              {/* <div className="rDesc">{item.desc}</div> */}
              <div className="rMax">
                Max people: <span>{item.maxPeople}</span>
              </div>
              <div className="rPrice">Cheapest Price: {item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="rRoom" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    className="rRoomCheckbox"
                    value={roomNumber._id}
                    name={roomNumber.number}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleClick}
          className="rButton"
          disabled={selectedRoomNumbersIDs.length === 0}
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
