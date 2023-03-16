import React from 'react'
import { Card, Feed } from 'semantic-ui-react'

export default function News() {
    return (
        <div>
            {/* <h1>What's New in Tennis</h1> */}
            <Card>
                <Card.Content>
                    <Card.Header>Recent News in Tennis</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                        <Feed.Label image='https://images.tennis.com/image/private/t_16-9_1024/f_auto/tenniscom-prd/nrkubumvfm2kxgvno1ft.jpg' />
                        <Feed.Content>
                            <Feed.Date content='1 hour ago' />
                            <Feed.Summary>
                            Tennis | <a href="https://www.tennis.com/news/articles/maria-sakkari-defeats-kvitova-to-reach-second-straight-indian-wells-semifinal" target="_blank">Maria Sakkari battles back to beat Petra Kvitova and reach second straight Indian Wells semifinal</a>
                            </Feed.Summary>
                        </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                        <Feed.Label image='https://media.cnn.com/api/v1/images/stellar/prod/230315101520-potapova-swiatek-split.jpg?c=16x9&q=h_270,w_480,c_fill' />
                        <Feed.Content>
                            <Feed.Date content='3 hours ago' />
                            <Feed.Summary>
                            CNN | <a href="https://www.cnn.com/2023/03/15/tennis/potapova-swiatek-intl-spt/index.html" target="_blank">Iga Swiatek: World No.1 calls for more support for Ukrainian tennis players</a>
                            </Feed.Summary>
                        </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                        <Feed.Label image='https://pyxis.nymag.com/v1/imgs/e53/8df/a2fecd8321fc01b54add77d3cdb85fcf21-BONY-tennis-courts-final.rhorizontal.w700.jpg' />
                        <Feed.Content>
                            <Feed.Date content='1 day ago' />
                            <Feed.Summary>
                            Curbed | <a href="https://www.curbed.com/article/best-tennis-courts-nyc.html" target="_blank">The Best Tennis Courts in New York</a>
                            </Feed.Summary>
                        </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
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

