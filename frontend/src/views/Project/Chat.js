import React, {useState, useEffect} from 'react';
import moment from "moment";
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_CHAT} from "../../graphql/getChat";
import {ADD_CHAT_MESSAGE} from "../../graphql/addChatMessage";
import {SUBSCRIBE_MESSAGE_ADDED} from "../../graphql/subscribeMessageAdded";
import '../../views/Project/chat.css'

const CURRENT_CHAT_ID = "5e515b05e907d28e8e59c4f0";

export default function Chat(props) {
    const [message, setMessage] = useState("");
    const {data, error, loading, subscribeToMore, refetch} = useQuery(GET_CHAT, {variables: {_id: props.chatId}});
    const [addChatMessage] = useMutation(ADD_CHAT_MESSAGE);
    const sendMessage = () => {
        addChatMessage({
            variables: {
                chatId: props.chatId,
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
        <Card>
            <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Чат</strong>
            </CardHeader>
            <CardBody>
                <div className="container">
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="mesgs">
                                {!loading && !error ?
                                    <div className="msg_history">
                                        {data.chat.messages.map(message =>
                                            message.sender._id === data.me._id ?
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
    )
}
