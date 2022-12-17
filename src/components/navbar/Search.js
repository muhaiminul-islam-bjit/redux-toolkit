import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searched } from "../../features/filter/filterSlice";
import { useMatch, useNavigate } from "react-router-dom";

export default function Search() {
    const dispatch = useDispatch();
    const [input, setInput] = useState();
    const { search } = useSelector(state => state.filters)
    const match = useMatch("/");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searched(input));

        if(!match){
            navigate("/");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                className="outline-none border-none mr-2"
                type="search"
                name="search"
                placeholder="Search"
                value={input}
                onChange={handleChange}
            />
        </form>
    );
}
