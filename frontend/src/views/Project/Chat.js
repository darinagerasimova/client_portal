import React, {useState, useEffect, useCallback, useMemo} from 'react';
import moment from "moment";
import {useDropzone} from 'react-dropzone'
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_CHAT} from "../../graphql/getChat";
import {ADD_CHAT_MESSAGE} from "../../graphql/addChatMessage";
import {ADD_CHAT_FILE_MESSAGE} from "../../graphql/addChatFileMessage";
import {SUBSCRIBE_MESSAGE_ADDED} from "../../graphql/subscribeMessageAdded";
import '../../views/Project/chat.css'

export default function Chat(props) {
    const [message, setMessage] = useState("");
    const {data, error, loading, subscribeToMore, refetch} = useQuery(GET_CHAT, {variables: {_id: props.chatId}});
    const [addChatMessage] = useMutation(ADD_CHAT_MESSAGE);
    const [addChatFileMessage] = useMutation(ADD_CHAT_FILE_MESSAGE);
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({noClick: true})
    const files = useMemo(() => {
        return acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);
    }, [acceptedFiles])

    const sendMessage = () => {
        if (acceptedFiles.length) {
            addChatFileMessage({
                variables: {
                    file: acceptedFiles[0],
                    chatId: props.chatId,
                }
            })
        } else {
            addChatMessage({
                variables: {
                    chatId: props.chatId,
                    message,
                }
            }).then(() => setMessage(""));
        }
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

    console.log(acceptedFiles)

    return (
        <Card>
            <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Chat</strong>
            </CardHeader>
            <CardBody>
                <div className="container" {...getRootProps()}>
                    <div className="messaging">
                        <div className={"inbox_msg" + (isDragActive ? " active" : "")}>
                            <div className="mesgs">
                                {!loading && !error ?
                                    <div className="msg_history">
                                        {data.chat.messages.map(message =>
                                            message.sender._id === data.me._id ?
                                                <div className="outgoing_msg">
                                                    <div className="sent_msg">
                                                        {message.fileUrl ?
                                                                <a href={message.fileUrl}>{message.message}</a> :
                                                                <p>{message.message}</p>}
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
                                                            {message.fileUrl ?
                                                                <a href={message.fileUrl}>{message.message}</a> :
                                                                <p>{message.message}</p>}
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
                                        <input {...getInputProps()}/>
                                        {files.length ? <div className="write_msg">{files}</div> :
                                            <input type="text"
                                                   className="write_msg"
                                                   name="message"
                                                   value={message}
                                                   onChange={(e) => setMessage(e.target.value)}
                                                   placeholder="Type a message"/>}
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
