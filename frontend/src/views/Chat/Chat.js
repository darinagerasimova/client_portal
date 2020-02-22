import React, {useState, useEffect} from 'react';
import moment from "moment";
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_CHAT} from "../../graphql/getChat";
import {ADD_CHAT_MESSAGE} from "../../graphql/addChatMessage";
import {SUBSCRIBE_MESSAGE_ADDED} from "../../graphql/subscribeMessageAdded";
import './chat.css'

const CURRENT_USER_ID = "5e480954a7b4b65adf453e2e";
const CURRENT_CHAT_ID = "5e515b05e907d28e8e59c4f0";

export default function Chat() {
    const [message, setMessage] = useState("");
    const {data, error, loading, subscribeToMore, refetch} = useQuery(GET_CHAT);
    const [addChatMessage] = useMutation(ADD_CHAT_MESSAGE);
    const sendMessage = () => {
        addChatMessage({
            variables: {
                chatId: CURRENT_CHAT_ID,
                senderId: CURRENT_USER_ID,
                message,
            }
        }).then(() => setMessage(""));
    };
    const subscribeToNewMessages = () => {
        subscribeToMore({
            document: SUBSCRIBE_MESSAGE_ADDED,
            updateQuery: (prev, {subscriptionData}) => {
                refetch();
                return prev;
            }
        });
    };
    useEffect(() => {
        subscribeToNewMessages()
    }, []);
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i><strong>Chat</strong>
                        </CardHeader>
                        <CardBody>
                            <div className="container">
                                <div className="messaging">
                                    <div className="inbox_msg">
                                        {/*                        <div className="inbox_people">*/}
                                        {/*                            <div className="headind_srch">*/}
                                        {/*                                <div className="recent_heading">*/}
                                        {/*                                    <h4>Recent</h4>*/}
                                        {/*                                </div>*/}
                                        {/*                                <div className="srch_bar">*/}
                                        {/*                                    <div className="stylish-input-group">*/}
                                        {/*                                        <input type="text" className="search-bar" placeholder="Search"/>*/}
                                        {/*                                        <span className="input-group-addon">*/}
                                        {/*<button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>*/}
                                        {/*</span></div>*/}
                                        {/*                                </div>*/}
                                        {/*                            </div>*/}
                                        {/*                            <div className="inbox_chat">*/}
                                        {/*                                <div className="chat_list active_chat">*/}
                                        {/*                                    <div className="chat_people">*/}
                                        {/*                                        <div className="chat_img"><img*/}
                                        {/*                                            src="https://ptetutorials.com/images/user-profile.png"*/}
                                        {/*                                            alt="sunil"/></div>*/}
                                        {/*                                        <div className="chat_ib">*/}
                                        {/*                                            <h5>Sunil Rajput <span className="chat_date">Dec 25</span>*/}
                                        {/*                                            </h5>*/}
                                        {/*                                            <p>Test, which is a new approach to have all solutions*/}
                                        {/*                                                astrology under one roof.</p>*/}
                                        {/*                                        </div>*/}
                                        {/*                                    </div>*/}
                                        {/*                                </div>*/}
                                        {/*                                <div className="chat_list">*/}
                                        {/*                                    <div className="chat_people">*/}
                                        {/*                                        <div className="chat_img"><img*/}
                                        {/*                                            src="https://ptetutorials.com/images/user-profile.png"*/}
                                        {/*                                            alt="sunil"/></div>*/}
                                        {/*                                        <div className="chat_ib">*/}
                                        {/*                                            <h5>Sunil Rajput <span className="chat_date">Dec 25</span>*/}
                                        {/*                                            </h5>*/}
                                        {/*                                            <p>Test, which is a new approach to have all solutions*/}
                                        {/*                                                astrology under one roof.</p>*/}
                                        {/*                                        </div>*/}
                                        {/*                                    </div>*/}
                                        {/*                                </div>*/}
                                        {/*                                <div className="chat_list">*/}
                                        {/*                                    <div className="chat_people">*/}
                                        {/*                                        <div className="chat_img"><img*/}
                                        {/*                                            src="https://ptetutorials.com/images/user-profile.png"*/}
                                        {/*                                            alt="sunil"/></div>*/}
                                        {/*                                        <div className="chat_ib">*/}
                                        {/*                                            <h5>Sunil Rajput <span className="chat_date">Dec 25</span>*/}
                                        {/*                                            </h5>*/}
                                        {/*                                            <p>Test, which is a new approach to have all solutions*/}
                                        {/*                                                astrology under one roof.</p>*/}
                                        {/*                                        </div>*/}
                                        {/*                                    </div>*/}
                                        {/*                                </div>*/}
                                        {/*                                <div className="chat_list">*/}
                                        {/*                                    <div className="chat_people">*/}
                                        {/*                                        <div className="chat_img"><img*/}
                                        {/*                                            src="https://ptetutorials.com/images/user-profile.png"*/}
                                        {/*                                            alt="sunil"/></div>*/}
                                        {/*                                        <div className="chat_ib">*/}
                                        {/*                                            <h5>Sunil Rajput <span className="chat_date">Dec 25</span>*/}
                                        {/*                                            </h5>*/}
                                        {/*                                            <p>Test, which is a new approach to have all solutions*/}
                                        {/*                                                astrology under one roof.</p>*/}
                                        {/*                                        </div>*/}
                                        {/*                                    </div>*/}
                                        {/*                                </div>*/}
                                        {/*                                <div className="chat_list">*/}
                                        {/*                                    <div className="chat_people">*/}
                                        {/*                                        <div className="chat_img"><img*/}
                                        {/*                                            src="https://ptetutorials.com/images/user-profile.png"*/}
                                        {/*                                            alt="sunil"/></div>*/}
                                        {/*                                        <div className="chat_ib">*/}
                                        {/*                                            <h5>Sunil Rajput <span className="chat_date">Dec 25</span>*/}
                                        {/*                                            </h5>*/}
                                        {/*                                            <p>Test, which is a new approach to have all solutions*/}
                                        {/*                                                astrology under one roof.</p>*/}
                                        {/*                                        </div>*/}
                                        {/*                                    </div>*/}
                                        {/*                                </div>*/}
                                        {/*                                <div className="chat_list">*/}
                                        {/*                                    <div className="chat_people">*/}
                                        {/*                                        <div className="chat_img"><img*/}
                                        {/*                                            src="https://ptetutorials.com/images/user-profile.png"*/}
                                        {/*                                            alt="sunil"/></div>*/}
                                        {/*                                        <div className="chat_ib">*/}
                                        {/*                                            <h5>Sunil Rajput <span className="chat_date">Dec 25</span>*/}
                                        {/*                                            </h5>*/}
                                        {/*                                            <p>Test, which is a new approach to have all solutions*/}
                                        {/*                                                astrology under one roof.</p>*/}
                                        {/*                                        </div>*/}
                                        {/*                                    </div>*/}
                                        {/*                                </div>*/}
                                        {/*                                <div className="chat_list">*/}
                                        {/*                                    <div className="chat_people">*/}
                                        {/*                                        <div className="chat_img"><img*/}
                                        {/*                                            src="https://ptetutorials.com/images/user-profile.png"*/}
                                        {/*                                            alt="sunil"/></div>*/}
                                        {/*                                        <div className="chat_ib">*/}
                                        {/*                                            <h5>Sunil Rajput <span className="chat_date">Dec 25</span>*/}
                                        {/*                                            </h5>*/}
                                        {/*                                            <p>Test, which is a new approach to have all solutions*/}
                                        {/*                                                astrology under one roof.</p>*/}
                                        {/*                                        </div>*/}
                                        {/*                                    </div>*/}
                                        {/*                                </div>*/}
                                        {/*                            </div>*/}
                                        {/*                        </div>*/}
                                        <div className="mesgs">
                                            {!loading && !error ?
                                                <div className="msg_history">
                                                    {data.chats[0].messages.map(message =>
                                                        message.sender._id === CURRENT_USER_ID ?
                                                            <div className="outgoing_msg">
                                                                <div className="sent_msg">
                                                                    <p>{message.message}</p>
                                                                    <span
                                                                        className="time_date"> {moment(message.createdAt).format("HH:mm  |  MMMM D")}</span>
                                                                </div>
                                                            </div> :
                                                            <div className="incoming_msg">
                                                                <div className="incoming_msg_img"><img
                                                                    src="https://ptetutorials.com/images/user-profile.png"
                                                                    alt="sunil"/></div>
                                                                <div className="received_msg">
                                                                    <div className="received_withd_msg">
                                                                        <p>{message.message}</p>
                                                                        <span
                                                                            className="time_date"> {moment(message.createdAt).format("HH:mm  |  MMMM D")}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    )}
                                                </div>
                                                : <div/>}
                                            <div className="type_msg">
                                                <div className="input_msg_write">
                                                    <input type="text"
                                                           className="write_msg"
                                                           name="message"
                                                           value={message}
                                                           onChange={(e) => setMessage(e.target.value)}
                                                           placeholder="Type a message"/>
                                                    <button className="msg_send_btn" type="button"
                                                            onClick={sendMessage}><i className="fa fa-paper-plane-o"
                                                                                     aria-hidden="true"/></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
