import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import ActionButton from '../layout/ActionButton'


const SingleData = ({data}) => {
    const {_id,title,description,url,status} = data
    return (
        <Card 
            className='shadow' 
            border={
                status==='LEARNED'
                ? 'success'
                : status==='LEARNING'
                ? 'warning'
                : 'danger'
            }
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className='post-title'>{title}</p>
                            <Badge
                                pill
                                bg={
                                    status==='LEARNED'
                                    ? 'success'
                                    : status==='LEARNING'
                                    ? 'warning'
                                    : 'danger'
                                }
                            >
                                {status}
                            </Badge>
                        </Col>

                        <Col className="d-flex justify-content-end align-items-start">
                            <ActionButton url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>

                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SingleData

