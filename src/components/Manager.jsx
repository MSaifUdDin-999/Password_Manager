import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef(); // For the eye icon
    const passwordRef = useRef(); // For the input field

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("/api/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)

    }

    useEffect(() => {
        getPasswords()

    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }       // Creating new object by: -> Copying everything from the current "form", -> Overwriting or adding one field(site, username or password etc)

    const showPassword = () => {

        if (passwordRef.current.type === "password") {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
    }

    // "..." --> The spread operator (...) is a way to copy or unpack values from arrays or objects into a new one.

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // If any such ID exist in db, delete it
            if (form.id){
                await fetch("/api/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            }

            const newId = uuidv4()
            setPasswordArray([...passwordArray, { ...form, id: newId }])  // Creating new array by: -> Copying everything from the current "passwordArray", -> Adding the new "form" data to the end
            await fetch("/api/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id:newId }) })
            setform({ site: "", username: "", password: "" })

            toast('Password saved successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Error: Password not saved!');
        }

    }

    const copyText = (text) => {
        toast('Copied to Clipboard 🦄', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))  // The array element whose id don't match with given id are store in the form of array in "passwordArray". Ignore the match id "Which means delete"
            let res = await fetch("/api/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Password Deleted...!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }

    const editPassword = (id) => {      // Moving the password(data) into the input field & remove it from table & local storage
        console.log("Editing password with id ", id)
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})   //return the filter result in form of array. In this case, return only 1 id element. So we can acess element by index

        setPasswordArray(passwordArray.filter(item => item.id !== id)) // removing the element being edited from table -> automatically del from local storage
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className="p-2 md:mycontainer md:py-7">
                <h1 className='text-4xl text-center font-bold'>
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-800 text-lg text-center'>Your own Password Manager</p>

                <div className='text-black flex flex-col p-5 gap-8 items-center max-w-4xl mx-auto'>
                    <input value={form.site} onChange={handleChange} type="text" name='site' placeholder='Enter Website URL' className='bg-white rounded-full border border-green-500 w-full p-4 py-1' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} type="text" name='username' placeholder='Enter Username' className='bg-white rounded-full border border-green-500 w-full p-4 py-1' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} type="password" name='password' placeholder='Enter Password' className='bg-white rounded-full border border-green-500 w-full p-4 py-1' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="/icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full border border-green-800 px-6 gap-2 py-2 w-fit'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>

                <div className='passwords px-4 md:px-38'>
                    <h2 className='font-bold text-xl py-4 md:px-10'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='md:px-10'>No Password to Show</div>}
                    {passwordArray.length !== 0 && (<div className="overflow-x-auto w-full md:px-10">
                        <table className="table-auto w-full rounded-md mb-17">
                            <thead className='bg-green-700 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='border border-white py-2 text-center'>
                                            <div className='flex items-center justify-center'><a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ width: "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>

                                        </td>
                                        <td className='border border-white py-2 text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ width: "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center'>
                                            <div className='flex items-center justify-center'>
                                                {/* Use the repeat function to hide the passwords */}
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ width: "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }} >
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }} >
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default Manager
