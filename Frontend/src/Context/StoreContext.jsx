import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    
    const [serviceRequests, setServiceRequests] = useState([]);  
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [service_list, setServiceList] = useState([]);

    // Service Request Function (Cart System Hata Diya)
    const requestService = async (serviceId) => {  
        if (!serviceRequests.includes(serviceId)) {  
            setServiceRequests((prev) => [...prev, serviceId]);  
        }  
        if (token) {
            await axios.post(url + "/api/service/request", { serviceId }, { headers: { token } });
        }
    };  

    // Remove Service Request
    const removeServiceRequest = async (serviceId) => {
        setServiceRequests((prev) => prev.filter((id) => id !== serviceId));

        if (token) {
            await axios.post(url + "/api/service/remove", { serviceId }, { headers: { token } });
        }
    };

    // Fetch List of Services
    const fetchServiceList = async () => {
        const response = await axios.get(url + "/api/services/list");
        setServiceList(response.data.data);
    };

    // Get Total Cart Amount (Total Services Selected)
    const getTotalCartAmount = () => {
        return serviceRequests.length;
    };

    // Load Data on Component Mount
    useEffect(() => {
        async function loadData() {
            await fetchServiceList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {  
        service_list,  
        serviceRequests,  
        requestService,  
        removeServiceRequest,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
