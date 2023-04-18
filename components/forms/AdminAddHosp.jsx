import Input from "../micro components/Input"
import formParse from "form-parse";
export default function Form() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        let fd = formParse(e.target)
        console.log(fd)
        const res = await fetch('/api/admin/add', {
            method: 'POST',
            body: JSON.stringify(fd)
        }).then(res => res.json())
        console.log(res)
    }

    return <>
        <div className="text-xl font-semibold select-none">Add a Hospital/Clinic</div>
        <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
            <label>Fields with <strong>*</strong> are mandatory</label>
            <Input k="name" name="Name" placeholder="hospital/clinic name" required />
            <Input k="branch" name="Branch" placeholder="Locality Eg: Uppal; Madhapur etc" />
            {/* Regex pattern / ^[6-9]\d{9}$ /gi will match phone numbers of 10 digits starting with 6 7 8 9 */}
            <Input k="phone" name="Phone - 10 digits" type="tel" placeholder="9876543210" pattern="^[6-9]\d{9}$" />
            <Input k="mail" name="Mail" type="email" placeholder="admin@hospital.com" required />
            <Input k="address" name="Full Address" placeholder="Recommended to paste from google maps" />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
}