import React, {useState} from "react";
import "../styles/Ribbon.css";
import { FaRegFolderOpen, FaSave, FaUnderline, FaItalic, FaBold, FaCheckSquare, FaCircle } from "react-icons/fa";
import { MdTextDecrease, MdTextIncrease } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Ribbon({gotoSave}) {
    const navigate = useNavigate();
    return(
        <div className="ribbon-tab">
            <button className="ribbon-btn" title="View" onClick={() => navigate('/notes')}><FaRegFolderOpen /></button>
            <button className="ribbon-btn" title="Save" onClick={gotoSave}><FaSave /></button>
            <button className="ribbon-btn" title="Bold" onClick={() => document.execCommand('bold')}><FaBold /></button>
            <button className="ribbon-btn" title="Italic" onClick={() => document.execCommand('italic')}><FaItalic /></button>
            <button className="ribbon-btn" title="Underline" onClick={() => document.execCommand('underline')}><FaUnderline /></button>
            <button className="ribbon-btn" title="Checklist" onClick={() => { document.execCommand('insertHTML', false, '<input type="checkbox" />'); }}><FaCheckSquare /></button>
            <button className="ribbon-btn" title="Bullet" onClick={() => { document.execCommand('insertUnorderedList'); }}><FaCircle /></button>
        </div>
    );
}