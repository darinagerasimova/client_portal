import React from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";

import './files.css'

const FILE_TYPES = {
    'xls': 'excel',
    'xlsx': 'excel',
    'pdf': 'pdf',
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
};

const FILE_COLORS = {
    'xls': 'success',
    'xlsx': 'success',
    'pdf': 'danger',
    'jpg': 'dark',
    'jpeg': 'dark',
    'png': 'dark',
};

const getFileSize = (size) => {
    if (size < 1024) return size + " B";
    if (size < 1048576) return (Math.floor(size / 1024 * 100) / 100) + " KB";
    if (size < 1073741824) return (Math.floor(size / 1024 / 1024 * 100) / 100) + " MB";
    if (size < 1099511627776) return (Math.floor(size / 1024 / 1024 / 1024 * 100) / 100) + " GB";
};

export default function ProjectStepFiles(props) {
    return (
        <Card>
            <CardHeader>
                <strong><i className="icon-info pr-1"/>Файлы</strong>
            </CardHeader>
            <CardBody>
                <div className="documents documents-panel">
                    {props.files.map(file =>
                        <div className="document" onClick={() => window.open(file.fileKey, "_blank")}>
                            <div className="document-body">
                                <i className={`fa fa-file-${FILE_TYPES[file.extension]}-o text-${FILE_COLORS[file.extension]}`}/>
                            </div>
                            <div className="document-footer">
                                <span className="document-name"> {file.name} </span>
                                <span className="document-description"> {getFileSize(file.size)} </span>
                            </div>
                        </div>)}
                </div>
            </CardBody>
        </Card>
    );
}