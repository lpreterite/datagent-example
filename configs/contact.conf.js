import Datagent from "datagent";
import axios from "axios";

export default Datagent.Contact({
    base: axios.create({ baseURL: "https://jsonplaceholder.typicode.com/" })
})