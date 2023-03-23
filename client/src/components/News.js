import React from 'react'
import { Card, Button, Row, Col, Modal }from 'react-bootstrap';
// import { Card, Button, Image } from 'semantic-ui-react'
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

export default function News() {
    return (
        <div>
            <h2>What's New in Tennis</h2>
                <Card style={{ width: '18rem' }}>
                    <Card.Img src="https://images.tennis.com/image/private/t_16-9_1024/f_auto/tenniscom-prd/nrkubumvfm2kxgvno1ft.jpg"/>
                        <Card.Body>
                            <Card.Title>Tennis</Card.Title>
                            <Card.Footer>1 hour ago</Card.Footer>
                            <Card.Text>Maria Sakkari battles back to beat Petra Kvitova and reach second straight Indian Wells semifinal</Card.Text>
                            <Button id='edit-btn'><a href="https://www.tennis.com/news/articles/maria-sakkari-defeats-kvitova-to-reach-second-straight-indian-wells-semifinal" target="_blank">Read Full Article</a></Button>
                        </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Img src="https://media.cnn.com/api/v1/images/stellar/prod/230315101520-potapova-swiatek-split.jpg?c=16x9&q=h_270,w_480,c_fill"/>
                        <Card.Body>
                            <Card.Title>CNN</Card.Title>
                            <Card.Footer>3 hours ago</Card.Footer>
                            <Card.Text>Iga Swiatek: World No.1 calls for more support for Ukrainian tennis players</Card.Text>
                            <Button id='edit-btn'><a href="https://www.cnn.com/2023/03/15/tennis/potapova-swiatek-intl-spt/index.html" target="_blank">Read Full Article</a></Button>
                        </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Img src="https://pyxis.nymag.com/v1/imgs/e53/8df/a2fecd8321fc01b54add77d3cdb85fcf21-BONY-tennis-courts-final.rhorizontal.w700.jpg"/>
                    <Card.Body>
                            <Card.Title>Curbed</Card.Title>
                            <Card.Footer>1 day ago</Card.Footer>
                            <Card.Text>The Best Tennis Courts in New York</Card.Text>
                            <Button id='edit-btn'><a href="https://www.curbed.com/article/best-tennis-courts-nyc.html" target="_blank">Read Full Article</a></Button>
                    </Card.Body>
                </Card>

            <h2>Checkout Netflix's new tennis documentary, <em>Break Point</em></h2>
                <iframe
                    width="797"
                    height="448"
                    src="https://www.youtube.com/embed/seSCvuejudM"
                    title="Break Point | Official Trailer | Netflix"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
        </div>
    )
}

