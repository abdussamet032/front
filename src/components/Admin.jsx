import Header from "./Header";
import InputWithLabel from "./InputWithLabel.jsx";
import VenueList from "./VenueList.jsx";
import React from "react";
import VenueReducer from "../services/VenueReducer.jsx";
import VenueDataService from "../services/VenueDataService.jsx";
// import axios from "axios";

const useCookies = (key, defaultValue) => {
    const [cookie, setCookie] = React.useState(
        localStorage.getItem(key) || defaultValue
    );
    React.useEffect(() => {
        localStorage.setItem(key, cookie);
    }, [cookie, key]);
    return [cookie, setCookie];
};


const Admin = () => {
    const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
        data: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
    });
    const search = (event) => {
        setSearchVenue(event.target.value);
    };
    React.useEffect(() => {
        dispatchVenues({type: "FETCH_INIT"});
        try {

            VenueDataService.listJsonVenues().then((result) => {
                dispatchVenues({
                    type: "FETCH_SUCCESS",
                    payload: result.data,
                });
            });
        } catch {
            dispatchVenues({type: "FETCH_FAILURE"});
        }
    }, []);

// let veriler   = []
//     axios.get('http://localhost:3004/mekanlar')
//     .then(function (response) {
//         veriler.push(response)
//     })
//     .catch(function (error) {
//         return error
//     })
//     console.log(veriler)




    return (
        <>
            <Header
                headerText="Yönetici"
                motto="Mekanlarınızı Yönetin!"
            />
            <div className="row">
                <VenueList venues={venues.data} admin={true}/>
            </div>
        </>
    );
}

export default Admin;
