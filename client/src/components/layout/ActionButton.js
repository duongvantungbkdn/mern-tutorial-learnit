import Button from 'react-bootstrap/Button'
import EditPencil from '../../assets/icons/EditPencil.svg'
import Trash from '../../assets/icons/Trash2.svg'
import Play from '../../assets/icons/PlayCircle2PNG.png'
import { useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'



const ActionButton = ({url,_id}) => {
    // take props from useContext
    const {
        setShowConfirmDeleteModal,
        setShowEditDataModal,
        findData
    } = useContext(DataContext)

    // choose edit data
    const chooseEditData = id => {
        findData(id)
        setShowEditDataModal(true)
    }

    // choose delete data
    const chooseDeleteData = id => {
        findData(id)
        setShowConfirmDeleteModal(true)
    }

    return (
        <>
            <Button className='post-button' href={url} target='_blank'>
                <img src={Play} alt='play' width='32' heighr='32'/>
            </Button>
            <Button className='post-button' 
                onClick={() => chooseEditData(_id)}
            >
                <img src={EditPencil} alt='edit' width='28' heighr='28'/>
            </Button>
            <Button className='post-button' 
                onClick={() => chooseDeleteData(_id)}
            >
                <img src={Trash} alt='trash' width='28' heighr='28'/>
            </Button>
        </>
    )
}

export default ActionButton
