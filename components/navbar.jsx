// Not really optimised, laggy
import Link from 'next/link';
import { useAppContext } from '../lib/context';
import { HiMenuAlt1 } from 'react-icons/hi';
import { AiOutlineHome, AiOutlineForm, AiOutlineUser } from 'react-icons/ai';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
    const { context } = useAppContext();
    return (
        <header className="navbar bg-base-100 shadow-lg font-semibold z-[50]">
            <MenuCompact context={context} />
            <div className='navbar-end lg:navbar-start'>
                <Link href="/" className="btn btn-ghost btn-lg normal-case text-xl tracking-widest">
                    HMS<em className="text-red-500">+</em>
                </Link>
            </div>
            <Menu context={context} />
        </header>
    )
}

function MenuItems({ context }) {
    const { loggedin, username, role } = context
    return (
        <>
            <li><a><AiOutlineHome />Home</a></li>
            <li><a><AiOutlineForm />Contact Us</a></li>
            {username ?
                <li><Link href={`/${role}/dashboard`}>
                    <AiOutlineUser />{username}
                </Link></li>
                : null}
            <li>{loggedin ? <LogOutBtn /> : <LogInBtn />}</li>
        </>
    )
}

// MenuCompact rendered for mobile devices
function MenuCompact({ context }) {
    return <div className='navbar-start lg:hidden flex z-50'>
        <div className='dropdown'>
            <label tabIndex="0" className="btn btn-lg btn-ghost lg:hidden">
                <HiMenuAlt1 />
            </label>
            <ul tabIndex="0" className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <MenuItems context={context} />
            </ul>
        </div>
    </div>
}

// Normal menu rendered on large screens
function Menu({ context }) {
    return <div className='navbar-end hidden lg:flex '>
        <ul tabIndex="0" className="menu menu-horizontal  p-0 ">
            <MenuItems context={context} />
        </ul>
    </div>
}

function LogInBtn() {
    return <Link href="/login" className='hover:outline-double hover:outline-primary'>
        Log In <FaSignInAlt />
    </Link>
}
function LogOutBtn() {
    return <Link href="/logout" className='hover:outline-double hover:outline-red-500'>
        Log Out <FaSignOutAlt />
    </Link>
}