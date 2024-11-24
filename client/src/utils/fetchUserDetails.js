import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDatils
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUserDetails