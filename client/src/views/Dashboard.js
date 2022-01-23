import { DataContext } from "../contexts/DataContext"
import { AuthContext } from "../contexts/AuthContext"
import { useContext,useEffect } from "react"
import Spinner from "react-bootstrap/Spinner"
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SingleData from "../components/datas/SingleData"
import CreateDataModal from "../components/datas/CreateDataModal"
import AddIcon from '../../src/assets/icons/addIcon1.png'
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip" 
import ConfirmDeleteModal from "../components/datas/ConfirmDeleteModal"
import EditDataModal from "../components/datas/EditDataModal"
import ToastMessage from "../components/datas/ToastMessage"

const Dashboard = () => {
    //take props from useContext
    const {
        getDatas,
        dataState: {dataChosen,datas,dataLoading},
        setShowCreateDataModal,      
    } = useContext(DataContext)
    const {authState: {user: {username}}} = useContext(AuthContext)

    // start: get all datas one time
    useEffect(() => getDatas(),[])

    let body = null

    if(dataLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    } else if (datas.length === 0) {
        body = (
            <Card className="text-center mx-5 my-5">
                <Card.Header as='h1'>Hi {username}</Card.Header>
                <Card.Body>
                    <Card.Title>Wellcome to Learnit</Card.Title>
                    <Card.Text>Click button below to add your first Data</Card.Text>
                    <Button variant='primary' 
                        onClick={() => setShowCreateDataModal(true)}
                    >
                        Add Data
                    </Button>
                </Card.Body>
            </Card>
        )
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {datas.map((data,index) => 
                        <Col key={index} className='my-2'>
                            <SingleData data={data}/>
                        </Col>
                    )}
                </Row>
                <OverlayTrigger
                    placement='left'
                    overlay={<Tooltip>Add Data</Tooltip>}
                >
                    <Button 
                        className='btn-floating'
                        onClick={() => setShowCreateDataModal(true)}
                    >
                        <img src={AddIcon} alt='addData'/>
                    </Button>
                </OverlayTrigger>
            </>
        )
    }

    return (
        <>
            {body}

            {/* show modal after click button */}
            <CreateDataModal/>
            {dataChosen && <ConfirmDeleteModal data={dataChosen}/>}
            {dataChosen && <EditDataModal/>}
            
            {/* show toast after create/edit data */}
            <ToastMessage/>

        </>        
    )
}

export default Dashboard
