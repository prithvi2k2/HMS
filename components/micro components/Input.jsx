// Helper components

// `k` parameter is used to parse form data to json, if not specified `name` will be used as key
export default function Input({ name, k, type, placeholder, pattern, required }) {
    return (
        <label className="input-group input-group-vertical">
            <span className="select-none">{required ? '*' + name : name}</span>
            <input 
                name={k ?? name} 
                type={type} 
                className="input input-bordered" 
                pattern={pattern}
                placeholder={placeholder} 
                required={required} />
        </label>
    )
}