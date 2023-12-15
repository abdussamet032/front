import React, {useState} from "react";
import {useLocation, useParams, useRoutes} from "react-router-dom";
import VenueDataService from "../services/VenueDataService.jsx";
import venue from "./Venue.jsx";
import VenueReducer from "../services/VenueReducer.jsx";
import Header from "./Header.jsx";

function AddUpdateVenue() {
    //post işlemi için yapılmış kodlar
      const [mekanData, setMekanData] = useState({
        mekanAdi: "",
        mekanAdresi: "",
        imkanlar: "",
        enlem: "",
        boylam: "",
        gunler1: "",
        acilis1: "",
        kapanis1: "",
        kapali1: false,
        gunler2: "",
        acilis2: "",
        kapanis2: "",
        kapali2: false,
    });
       const convertToJSON = () => {
        const transformedData = {
            id: 1,
            name: mekanData.mekanAdi,
            address: mekanData.mekanAdresi,
            rating: '',
            foodanddrink: mekanData.imkanlar.split(','), // "," ile ayrılmış bir stringi diziye ceviriyor
            distance: '',
            coordinates: [parseFloat(mekanData.enlem), parseFloat(mekanData.boylam)],
            hours: [
                {
                    days: mekanData.gunler1,
                    open: mekanData.acilis1,
                    close: mekanData.kapanis1,
                    isclosed: mekanData.kapali1,
                },
                {
                    days: mekanData.gunler2,
                    open: mekanData.acilis2,
                    close: mekanData.kapanis2,
                    isclosed: mekanData.kapali2,
                },
            ],
            comments: [],
        };

        // Oluşturulan veriyi kullanmak veya göndermek için burada işlemleri gerçekleştirin
        // console.log('Transformed data:', transformedData);
        // axios.post('http://localhost:3004/mekanlar', {
        //     transformedData
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    };

     // Form verileri değiştikçe state'i güncelleyen fonksiyon
     const handleChange = (e) => {
         const { name, value, type, checked } = e.target;

         // Checkbox kontrolü
         const updatedValue = type === 'checkbox' ? checked : value;
         setMekanData({
             ...mekanData,
             [name]: updatedValue,
         });
     };

    // Form submit edildiğinde çalışacak fonksiyon
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    //güncelleme mi eklememi
    const [venue, dispatchVenue] = React.useReducer(VenueReducer, {
        data: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const location = useLocation();
    const  id  = location.search.split('=')[1]
    React.useEffect(() => {
        dispatchVenue({ type: "FETCH_INIT" });
        VenueDataService.listJsonVenues()
            .then((result) => {
                dispatchVenue({
                    type: "FETCH_SUCCESS",
                    payload: result.data,
                });
            })
            .catch(dispatchVenue({ type: "FETCH_FAILURE" }));
    }, [id]);

    if (venue.isSuccess) {
    return (
        <div>
            <Header
                headerText={id !== undefined ? 'Mekan Güncelle' : 'Yeni Mekan Ekle'}
            />
            <div className="row">
                <div className="col-xs-12 col-md-8">
                    <form className="form-horizontal" id="mekanEkle" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">Mekan Adı:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="mekanAdi" value={id !== undefined ? venue.data[id-1].name : ''} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">Mekan Adresi:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="mekanAdresi" value={id !== undefined ? venue.data[id-1].address : ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">İmkanlar:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="imkanlar" value={id !== undefined ? venue.data[id-1].foodanddrink : ''} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">Enlem:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="enlem" value={id !== undefined ? venue.data[id-1].coordinates[0] : ''} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">Boylam:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="boylam" value={id !== undefined ? venue.data[id-1].coordinates[1] : ''} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">Günler-1:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="gunler1" value={id !== undefined ? venue.data[id-1].hours[0].days : ''} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">Açılış-1:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="acilis1" value={id !== undefined ? venue.data[id-1].hours[0].open : ''} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">Kapanış-1:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="kapanis1" value={id !== undefined ? venue.data[id-1].hours[0].close : ''} onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">Günler-2:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="gunler2" value={id !== undefined ? venue.data[id-1].hours[1].close : ''} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">Açılış-2:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="acilis2" value={id !== undefined ? venue.data[id-1].hours[1].close : ''} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-10 col-sm-2">Kapanış-2:</label>
                            <div className="col-xs-12 col-sm-10">
                                <input className="form-control" name="kapanis2" value={id !== undefined ? venue.data[id-1].hours[1].close : ''} onChange={handleChange}/>
                            </div>
                        </div>
                        <button  className="btn btn-danger pull-right" type={"submit"}>{id !== undefined ? 'Mekanı Güncelle' : 'Mekanı Ekle'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
}

export default AddUpdateVenue;