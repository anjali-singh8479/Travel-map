import Map, { Marker, Popup } from "react-map-gl";
// import "mapbox gl/dist/mapbox-gl.css"
import { useEffect, useState } from "react";
import "./app.css";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { format } from "timeago.js";
import { ImLocation2 } from "react-icons/im";
import Register from "./components/Register";
import Login from "./components/Login";
function App() {
  const mystorage = window.localStorage;
  const [showlogin, setshowlogin] = useState(false);
  const [showregister, setshowregister] = useState(false);
  const [title, settitle] = useState(null);
  const [desc, setdesc] = useState(null);
  const [rating, setrating] = useState(0);
  const [newplace, setnewplace] = useState();
  const [current, setcurrent] = useState(1);
  const [currentuser, setcurrentuser] = useState(
    mystorage.getItem("currentuser")
  );
  const [pins, setpins] = useState([]);
  const [viewport, setviewport] = useState({
    latitude: 48.85809,
    longitude: 2.294694,
    zoom: 8,
  });
  useEffect(() => {
    const getpins = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/pin");
console.log(res)
        setpins(res.data.pins);
      } catch (err) {
        console.log(err);
      }
    };
    getpins();
  }, []);
  const handleMarkerClick = (id, latitude, longitude) => {
    // setcurrent({
    //   username,
    //   id,
    // });
    setcurrent(id);
    setviewport({ ...viewport, latitude, longitude });
  };

  const handleAddClick = (e) => {
    // const { lat, lng } = e.lngLat;
    const lat=e.lngLat.lat;
    const lng=e.lngLat.lng
   
    setnewplace({
      latitude: lat,
      longitude: lng,
    });
  };
 
  const handlesubmit = async (e) => {
    e.preventDefault();
   
    const newpin = {
      username: currentuser,
      latitude: newplace.latitude,
      longitude: newplace.longitude,
      title,
      description: desc,
      rating: rating,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/pin", newpin);
      setpins([...pins, res.data]);
      console.log(newplace)
      // setnewplace();
      // setcurrent({
      //   username:current.username,
      //   id:current.id
      // })
    } catch (err) {
      console.log(err);
    }
  };
  console.log(current);
  const handlelogout = () => {
    mystorage.removeItem("currentuser");
    setcurrentuser(null);
  };
  return (
    <>
      <div>
        <Map
          initialViewportState={viewport}
          style={{ width: "90vw", height: "100vh", position: "relative" }}
          // mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json "
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={(nextViewport) => setviewport(nextViewport)}
          onDblClick={handleAddClick}
        >
          {pins.map((p) => (
            <>
              <Marker
                latitude={p.latitude}
                longitude={p.longitude}
                offsetLeft={-3.5*viewport.zoom}
                offsetTop={-7*viewport.zoom}
               
              >
                <ImLocation2
                  color={p._id === current ? "tomato" : "slateblue"}
                  fontSize={viewport.zoom * 2.5}
                  cursor="pointer"
                  onClick={() =>
                    handleMarkerClick(p._id, p.latitude, p.longitude)
                  }
                />
              </Marker>
              {p._id === current && (
                <Popup
                  latitude={p.latitude}
                  longitude={p.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setcurrent(null)}
                >
                  <div className="popup">
                    <label>Place</label>
                    <h4>{p.title}</h4>
                    <label>Review</label>
                    <p className="description">{p.description}</p>
                    <label>rating</label>
                    <div>
                      {Array(p.rating).fill(<AiFillStar className="star" />)}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
              {newplace && (
                <Popup
                  latitude={newplace.latitude}
                  longitude={newplace.longitude}
                  closeButton={true}
                  anchor="left"
                  onClose={() => setnewplace(null)}
                >
                  <div>
                    <form onSubmit={handlesubmit}>
                      <label> Title</label>
                      <input
                        placeholder="Enter the title"
                        onChange={(e) => settitle(e.target.value)}
                      ></input>
                      <label>Review</label>
                      <input
                        placeholder="say something about htis place"
                        on
                        onChange={(e) => setdesc(e.target.value)}
                      ></input>
                      <label>Rating</label>
                      <select onChange={(e) => setrating(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button className="submitbutton" type="submit">
                        Add pin
                      </button>
                    </form>
                  </div>
                </Popup>
              )}
            </>
          ))}
          {currentuser ? (
            <button className="button logout" onClick={() => handlelogout()}>
              Logout
            </button>
          ) : (
            <div className="buttons">
              <button
                className="button login"
                onClick={() => setshowlogin(true)}
              >
                Login
              </button>
              <button
                className="button register"
                onClick={() => setshowregister(true)}
              >
                Register
              </button>
            </div>
          )}

          {showregister && (
            <Register className="register" setshowregister={setshowregister} />
          )}
          {showlogin && (
            <Login
              className="login"
              setshowlogin={setshowlogin}
              mystorage={mystorage}
              setcurrentuser={setcurrentuser}
            />
          )}
        </Map>

        {/* <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={(nextViewport) => setviewport(nextViewport)}
          mapLib={maplibregl}
          style={{ width: 400, height:400}}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        
        >
          <Marker latitude={46} longitude={17} offsetLeft={-20} offsetTop={-10} color="red"><div><ImLocation2/></div> </Marker>
        </ReactMapGL> */}
      </div>
    </>
  );
}

export default App;


