import React, {useState} from 'react';
import DeleteModal from '../DeleteModal';
import UpdatePostModal from '../UpdatePostModal/UpdatePostModal';
import API from '../../utils/API';
import './style.css';


export default function DotIcon({ UpdatePost, setPostTitle, setPostContent,  showDelete, setShowDelete, handleToggle, menu, setMenu, _id, update, setUpdate, title, content, setTitleChanged, setContentChanged}) {

    // const [showDelete, setShowDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const showDeleteModal = () => {
        showDelete ? setShowDelete(false) : setShowDelete(true);
    }


    const handleChange = (e) => {
        // e.preventDefault();

    const openUpdateModal = () => {
        showUpdateModal ? setShowUpdateModal(false) : setShowUpdateModal(true);
    }


    // const handleChange = (e) => {
    //     e.preventDefault();

    //     setShowInput({showInput: !showInput});
    // };

    // const x = showInput;


    const deletePost = (id) => {
        handleToggle();
        setShowDelete(false);
        API.deletePost(id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    return (

        <div className='menuIcon'>
            <span class='material-icons dotIcon' onClick={() => handleToggle()}>
                more_vert 
            </span> 
            {menu ? (
                <ul className='menu'>
                    <li onClick={() => openUpdateModal()}>Edit</li>
                    <li onClick={() => showDeleteModal()}>Delete</li>

                    <li onClick={handleChange}>Update Photo</li>

                    {/* <li onClick={handleChange}>Add Photo</li>

                    {
                    x && (
                        <div>
                        <input type='file' 
                        name='file' 
                        onChange={postImages}/>
                        </div>
                     )
                     } */}

                        </ul>
                    
                ) : null}
                <DeleteModal  
                    setShowDelete={setShowDelete} 
                    showDelete={showDelete} 
                    _id={_id} 
                    deletePost={deletePost} 
                    setUpdate={setUpdate} 
                    update={update} 
                />

                <UpdatePostModal 
                    title={title}
                    content={content}
                    setPostTitle={setPostTitle}
                    setPostContent={setPostContent}
                    _id={_id}
                    UpdatePost={UpdatePost}
                    showUpdateModal={showUpdateModal}
                    setShowUpdateModal={setShowUpdateModal}
                    setTitleChanged={setTitleChanged}
                    setContentChanged={setContentChanged}
                />
            </div>
        // </div>
    )
};
