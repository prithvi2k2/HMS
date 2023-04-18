// Custom responsive modal - centered on large screens, moves to bottom on smaller screens

export default function Modal({ children, id }) {

    return (
        <>
            {/* Use this labeled button to toggle modal in pages which require it
            <label htmlFor={id} className="btn modal-button">open modal</label> */}

            <input type="checkbox" id={id} className="modal-toggle " />
            <div className="modal modal-bottom sm:modal-middle transition-all">
                <div className="modal-box">
                    <label 
                        htmlFor={id} 
                        className="transition-all btn btn-circle absolute right-2 top-2 bg-transparent hover:bg-red-600 border-red-500">
                        X
                    </label>
                    {children}
                </div>
            </div>
        </>
    )

}