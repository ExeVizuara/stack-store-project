import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function UpdateField({ title, name, value, handleChange, expiration, setExpiration }) {

    const componentsMap = {
        'Vencimiento:': (
            <DatePicker
                className="sm:w-full rounded-md bg-gray-200 p-1"
                selected={value === '-' ? '' : value}
                showIcon
                isClearable
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                        const formattedDate = date.toISOString().split('T')[0];
                        setExpiration(formattedDate);
                        console.log(expiration);
                    }
                }
            />
        ),
        'Categoria': (
            <select
                className="sm:w-full rounded-md bg-gray-200 p-1"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
            >
                <option value="">Selecciona una categoría</option>
                <option value="categoria1">Categoría 1</option>
                <option value="categoria2">Categoría 2</option>
                <option value="categoria3">Categoría 3</option>
            </select>
        ),
    };

    return (
        <li className="flex flex-col">
            <label className="text-start sm:p-1">{title} </label>
            {componentsMap[title] || (<input
                type="text"
                name={name}
                value={value}
                required className="sm:w-full rounded-md bg-gray-200 p-1"
                onChange={handleChange}
            />)
            }
        </li>
    );
};