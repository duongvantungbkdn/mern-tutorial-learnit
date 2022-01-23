import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react';
import { DataContext } from '../../contexts/DataContext';

const EditDataModal = () => {
    // take props from useContext
    const {
        dataState: {dataChosen},
        editData,
        showEditDataModal,
        setShowEditDataModal,
        showToastMessage: {show,message,type},
        setShowToastMessage
    } = useContext(DataContext)    

    //useState
    const [editedData,setEditedData] = useState(dataChosen)

    // useEffect to watching chosen data
    useEffect(() => setEditedData(dataChosen),[dataChosen])

    const {title,description,url,status} = editedData

    //onChange EditDataForm
    const onChangeEditData = event => {
        setEditedData({...editedData, [event.target.name]: event.target.value})
    }

    //handle edit data
    const onSubmit = async event => {
        event.preventDefault()
        const {success,message} = await editData(editedData)
        setShowToastMessage({show:true,message,type: success?'success':'danger'})
        closeModal()
    }

    //close edit modal
    const closeModal = () => {
        setShowEditDataModal(false)
        setEditedData(dataChosen)
    }

    return (
        <>
            <Modal show={showEditDataModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>You are editting {title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='title' 
                            required 
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeEditData}
                        />
                        <Form.Text id='title-help' muted>Title is required</Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            as='textarea' 
                            row={3} 
                            name='description'
                            onChange={onChangeEditData}
                            value={description}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='url'
                            onChange={onChangeEditData}
                            value={url}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            as="select" 
                            value={status}
                            name='status'
                            onChange={onChangeEditData}
                        >
                            <option value="TO LEARN">To learn</option>
                            <option value="LEARNING">Learning</option>
                            <option value="LEARNED">Learned</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit'>Update</Button>
                    <Button variant='secondary' onClick={closeModal}>Cancel</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
};

export default EditDataModal;

