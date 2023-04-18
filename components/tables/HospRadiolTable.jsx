import { useState, useEffect } from "react"
import Modal from "../modal"
import AdmnAddHosp from "../forms/AdminAddHosp"

// Table for hospitals to manage radiologists
export default function Admin2HospTable() {
    const [selectAll, setSelectAll] = useState(false)
    const [selectedList, setSelectedList] = useState({})

    useEffect(() => {
        let newSelectedList = {}
        if (selectAll) {
            dataList.forEach(ele => newSelectedList[ele.id] = true);
        } else {
            dataList.forEach(ele => newSelectedList[ele.id] = false);
        }
        setSelectedList(newSelectedList)
    }, [selectAll])
    
    // Below feature effect(s) has bugs and impacting performance,
    // will be rewritten later as they have low priority & will be fixed later
    // useEffect(()=>{
    //     let values = Object.values(selectedList)
    //     let [zeroes, ones] = [values.includes(0), values.includes(1)]
    //     if (!zeroes && ones) setSelectAll(true)
    //     else if (zeroes && !ones) setSelectAll(false)
    // },[selectedList])

    return <div>
        <ActionBar />
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* HEAD */}
                <thead>
                    <TableHeadingRow select selectAll={selectAll} selectedList={selectedList}
                        setSelectAll={setSelectAll} />
                </thead>
                {/* BODY */}
                <tbody>
                    {
                        dataList.map(data =>
                            <TableRow key={data.id} data={data}
                                selectedList={selectedList} setSelectedList={setSelectedList} />)
                    }
                </tbody>
                {/* FOOT */}
                <tfoot>
                    <TableHeadingRow />
                </tfoot>
            </table>
        </div>
    </div>
}

function TableHeadingRow({ select, selectAll, setSelectAll, selectedList }) {
    function handleChange() {
        setSelectAll(prevSelect => !prevSelect)
    }
    return <tr className="select-none">
        <th>
            {select ?
                <label className="text-lg flex items-center gap-1">
                    <input type="checkbox" className="checkbox checkbox-primary"
                        checked={selectAll} onChange={handleChange} />
                    {Object.values(selectedList).filter(val => val == true).length}
                </label>
                : null}
        </th>
        <th>Hospital/Clinic Name</th>
        <th>Address</th>
        <th>Telephone</th>
        <th>E-Mail</th>
    </tr>
}

function TableRow({ data, selectedList, setSelectedList }) {
    const { id, name, branch, address, phone, mail } = data
    function handleChange() {
        setSelectedList(prev => {
            return { ...prev, [id]: true ^ prev[id] }
        })
    }
    return <tr>
        <th>
            <label>
                <input type="checkbox" className="checkbox checkbox-secondary"
                    checked={selectedList[id] ?? false} onChange={handleChange} />
            </label>
        </th>
        <td>
            <div className="flex items-center space-x-3">
                <div>
                    <div className="font-bold">{name}</div>
                    <div className="text-sm opacity-50">{branch}</div>
                </div>
            </div>
        </td>
        <td>{address}</td>
        <td>{phone}</td>
        <td>
            <a href={`mailto:${mail}`} className="link">
                {mail}</a>
        </td>
    </tr>
}

function ActionBar() {
    return (
        // simply add 'btn-disabled' class according to state to disable btns if not required
        <div className="btn-group justify-center m-5 mb-2">
            <label className="btn btn-success shadow-lg modal-btn" htmlFor="add">
                Add</label>
            <Modal id="add"><AdmnAddHosp /></Modal>

            <label className="btn btn-info shadow-lg modal-btn" htmlFor="edit">
                Edit</label>
            <label className="btn btn-warning shadow-lg" htmlFor="revoke">
                Revoke</label>
            <label className="btn btn-error shadow-lg" htmlFor="delete">
                Delete</label>
        </div>
    )
}

let dataList = [{
    id: '207dsf',
    name: 'Some Name',
    branch: 'Santoshnagar',
    address: '9G25+HHP, 1st Cross Rd, Vinayak Nagar Colony, Saroor Nagar West, Saidabad, Hyderabad, Telangana 500059',
    phone: '9876543210',
    mail: 'mymail@email.com',

}, {
    id: 'igsf485',
    name: 'Some Name',
    branch: 'Santoshnagar',
    address: '9G25+HHP, 1st Cross Rd, Vinayak Nagar Colony, Saroor Nagar West, Saidabad, Hyderabad, Telangana 500059',
    phone: '9876543210',
    mail: 'mymail@email.com',

}, {
    id: '3470347igyasd',
    name: 'Some Name',
    branch: 'Santoshnagar',
    address: '9G25+HHP, 1st Cross Rd, Vinayak Nagar Colony, Saroor Nagar West, Saidabad, Hyderabad, Telangana 500059',
    phone: '9876543210',
    mail: 'mymail@email.com',

},]